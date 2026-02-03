import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { usePublicClient } from "wagmi";
import { GiTrophy } from "react-icons/gi";
import ClaimFlexModal from "./claimflexmodal";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useClaimBPDs } from "../web3/hooks/useClaimBPDs";
import { cyan, green, grey, red } from "@mui/material/colors";
import { Box, Button, Grid, Typography } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useGetPendingBPDs } from "../web3/hooks/useGetPendingBPDs";
import { useGetClaimableFLEX } from "../web3/hooks/useGetClaimableFLEX";
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import { useGetIsBPDeligibleAddr } from "../web3/hooks/useGetIsBPDeligibleAddr";
import { useGetTotalFLEXReceived } from "../web3/hooks/useGetTotalFLEXReceived";
import { useGetTotalUSDTSentbyUser } from "../web3/hooks/useGetTotalUSDTSentbyUser";
import { useGetClaimedBUSD } from "../web3/hooks/useGetClaimedBUSD";
import { useGetBPDHitCount } from "../web3/hooks/useGetBPDHitCount";
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";

const sections = [
    {
        title: 'BigPayDay',
        firstIcon: <GiTrophy style={{ color: grey[50] }} />,
        secondIcon: <Image src="/assets/usdtlogo.png" alt="logo" width={40} height={40} />,
        thirdIcon: <Image src="/assets/flexsquarelogo.png" alt="logo" width={40} height={40} />,
        fourthIcon: <HowToRegIcon style={{ color: grey[50] }} />,
        firstText: ['0', 'BPD(s) received'],
        secondText: ['0.00', 'USDT contributed'],
        thirdText: ['0.00', 'FLEX received'],
        fourthText: 'Eligible for BPD',
        cta: 'Read more',
        cta2: null
    },
    {
        title: 'Claimable',
        firstIcon: <Image src="/assets/usdtlogo.png" alt="logo" width={40} height={40} />,
        secondIcon: <Image src="/assets/usdtlogo.png" alt="logo" width={40} height={40} />,
        thirdIcon: <Image src="/assets/flexsquarelogo.png" alt="logo" width={40} height={40} />,
        fourthIcon: null,
        firstText: ['0.00 USDT', 'BigPayDay(s) pending'],
        secondText: ['0.00 USDT', 'BigPayDay(s) claimed'],
        thirdText: ['0.00', 'FLEX pending'],
        fourthText: null,
        cta: 'Claim 0.00 USDT',
        cta2: 'Claim 0.00 FLEX'
    }
];

const MyAuctionStats = () => {
    // web3
    const { claimBPDs } = useClaimBPDs();
    const publicClient = usePublicClient();
    const { data: receivedFLEX, refetch: refetchReceived } = useGetTotalFLEXReceived();
    const { data: claimedBUSD, refetch: refetchClaimedBPD } = useGetClaimedBUSD();
    const { data: bpdHitCount, refetch: refetchHitCount } = useGetBPDHitCount();
    const { data: pendingBPDs, refetch: refetchBPDs } = useGetPendingBPDs();
    const { data: isBPDeligible, refetch: refetchEligibility } = useGetIsBPDeligibleAddr();
    const { data: totalUSDTsent } = useGetTotalUSDTSentbyUser();
    const { data: claimableFLEX, refetch: refetchClaimableFLEX } = useGetClaimableFLEX();
    
    //Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState(`Claim ${(getPendingBPDs)} USDT`)

    function handleClaimableFlex() {
        const formatted = claimableFLEX ? Number(formatEther(claimableFLEX)) : 0;
        if (formatted > 1000000) {
            const mFormatted = formatted / 1000000;
            return `${mFormatted.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} M`
        } else if (formatted < 1000000 && formatted > 1000) {
            const kFormatted = formatted / 1000000;
            return `${kFormatted.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} K`
        } else {
            return formatted.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
        }
    }

    function handleReceivedFLEX() {
        const formatted = receivedFLEX ? Number(formatEther(receivedFLEX)) : 0;
        if (formatted > 1000000) {
            const mFormatted = formatted / 1000000;
            return `${mFormatted.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} M`
        } else if (formatted < 1000000 && formatted > 1000) {
            const kFormatted = formatted / 1000000;
            return `${kFormatted.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} K`
        } else {
            return formatted.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
        }
    }

    function getPendingBPDs() {
        return pendingBPDs
            ? Number(formatEther(pendingBPDs)).toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            })
            : '0.00';
    }

    const handleClaimBPDs = async () => {
        try {
            const txHash = await claimBPDs(); 
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            setButtonText('Claiming...');
            setIsDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            await refetch();
            setButtonText(`Claim ${getPendingBPDs()} USDT`);
            setModalSuccess(true);
            setIsDisabled(false);
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
        }
    };

    const refetch = async () => {
        await Promise.all([
            refetchBPDs(),
            refetchReceived(),
            refetchClaimedBPD(),
            refetchHitCount(),
            refetchEligibility(),
            refetchClaimableFLEX()
        ]);
    };

    useEffect(() => {
        const pending = getPendingBPDs();
        setButtonText(`Claim ${pending} USDT`);
    }, [pendingBPDs]);

    return(
        <Grid container
            sx={{
                py: 2,
                px: 3,
                border: 1,
                width: '100%',
                borderRadius: 1,
                background: cardColor,
                borderColor: borderColor
            }}
        >
            <Typography color={grey[50]} fontWeight={900} fontSize={24}>
                My auction data
            </Typography>
            {sections.map((section, id) => (
            <Box
                key={id}
                sx={{
                    py: { xs: 0, sm: 2, md: 2, lg: 2 },
                    px: { xs: 0, sm: 3, md: 3, lg: 3 },
                    mt: { xs: 0, sm: 2, md: 2, lg: 2 },
                    border: { xs: 0, sm: 1, md: 1, lg: 1 },
                    width: '100%',
                    borderRadius: 1,
                    background: cardColor,
                    borderColor: { lg: borderColor, md: borderColor, sm: borderColor }
                }}
            >
                <Typography color={grey[50]} fontWeight={600} fontSize={20} sx={{ mt: { lg: 0, md: 0, sm: 0, xs: 3 }, mb: { lg: 0, md: 0, sm: 0, xs: 1 } }}>
                    {section.title}
                </Typography>
                <Box
                    sx={{
                        my: { xs: 0, sm: 2, md: 2, lg: 2 },
                        borderRadius: 3,
                        background: lightCardColor
                    }}
                >
                    <Grid
                        container
                        display="flex"
                        p={2}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            gap: { xs: 3, sm: 3, md: 0, lg: 0 },
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
                            alignItems: { xs: 'start', sm: 'start', md: 'center', lg: 'center' },
                            justifyContent: { xs: 'left', sm: 'left', md: 'space-between', lg: 'space-between' }
                        }}
                    >
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[400],
                                    justifyContent: 'center'
                                }}
                            >
                                {section.firstIcon}
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {
                                        id === 1 && pendingBPDs ? getPendingBPDs()
                                        : id === 0 && bpdHitCount ? bpdHitCount
                                        : section.firstText[0]
                                    }
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    {section.firstText[1]}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Total Sold */}
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[400],
                                    justifyContent: 'center'
                                }}
                            >
                                {section.secondIcon}
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {
                                        id === 0 && totalUSDTsent ? Number(formatEther(totalUSDTsent)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
                                        : id === 1 && claimedBUSD ? Number(formatEther(claimedBUSD)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
                                        : section.secondText[0]
                                    }
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    {section.secondText[1]}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Price */}
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[800],
                                    justifyContent: 'center'
                                }}
                            >
                                {section.thirdIcon}
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {id === 1 && claimableFLEX ? handleClaimableFlex()
                                    :
                                    id === 0 && receivedFLEX ? handleReceivedFLEX()
                                    :
                                    section.thirdText[0]}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    {section.thirdText[1]}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Eligibility */}
                        {section.fourthIcon &&
                            <Grid container display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        background: cyan[800],
                                        justifyContent: 'center'
                                    }}
                                >
                                    {section.fourthIcon}
                                </Box>
                                <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                    {id === 0 && (
                                    isBPDeligible === undefined
                                        ? <Typography color={grey[500]}>Checking…</Typography>
                                        : isBPDeligible
                                        ? <CheckRoundedIcon sx={{ color: green[400] }} />
                                        : <CloseRoundedIcon sx={{ color: red[400] }} />
                                    )}
                                    <Typography color={grey[500]} fontSize={16} mt={-0}>
                                        {section.fourthText}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        {/* Button */}
                        {!section.fourthIcon &&
                            <Grid container gap={2} sx={{ width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' } }}>
                                <Button
                                    disabled={isDisabled}
                                    onClick={() => handleClaimBPDs()}
                                    sx={{
                                        px: 2,
                                        height: 35,
                                        fontWeight: 600,
                                        borderRadius: 1,
                                        color: grey[900],
                                        background: grey[50],
                                        textTransform: 'none',
                                        flexGrow: { xs: 1, sm: 1, md: 'unset', lg: 'unset' },
                                        ":disabled": { background: grey[700], color: grey[300] },
                                        width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' }
                                    }}
                                >
                                    {buttonText}
                                </Button>
                                {section.cta2 && 
                                    <Button
                                        onClick={() => setOpen(true)}
                                        sx={{
                                            px: 2,
                                            height: 35,
                                            fontWeight: 600,
                                            borderRadius: 1,
                                            color: grey[900],
                                            background: grey[50],
                                            textTransform: 'none',
                                            flexGrow: { xs: 1, sm: 1, md: 'unset', lg: 'unset' },
                                            width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' }
                                        }}
                                    >
                                        Claim {handleClaimableFlex()} FLEX
                                    </Button>
                                }
                            </Grid>
                        }
                    </Grid>
                </Box>
            </Box>
            ))}
            <ClaimFlexModal open={open} setOpen={setOpen} amount={handleClaimableFlex()} onClaim={refetch}  />
            <SuccessfullTransactionModal open={modalSuccess} setOpen={setModalSuccess} />
            <RejectedTransactionModal open={modalRejection} setOpen={setModalRejection} />
            <SubmittedTransactionModal open={modalSubmitted} setOpen={setModalSubmitted} />
        </Grid>
    );
};

export default MyAuctionStats;
