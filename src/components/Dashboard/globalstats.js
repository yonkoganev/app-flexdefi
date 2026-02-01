import { FaCoins } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { formatEther, parseEther } from 'viem';
import { RiAuctionFill } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa6";
import { flexContracts } from "../web3/contracts";
import { BiSolidCoinStack } from "react-icons/bi";
import { RiCopperCoinFill } from "react-icons/ri";
import { cyan, grey } from "@mui/material/colors";
import { useAccount, usePublicClient } from "wagmi";
import { useApprove } from "../web3/hooks/useApprove";
import { useBuyBFLEX } from "../web3/hooks/useBuyBFLEX";
import WalletConnectButton from "../WalletConnectButton";
import { useGetSoldBFLEX } from "../web3/hooks/useGetSoldBFLEX";
import { useGetCurrentDay } from "../web3/hooks/useGetCurrentDay";
import { useGetTotalSupply } from "../web3/hooks/useGetTotalSupply";
import { useGetAllowanceUSDT } from "../web3/hooks/useGetAllowanceUSDT";
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import { useGetAllocatedSupply } from "../web3/hooks/useGetAllocatedSupply";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import { Avatar, Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";
import { useRouter } from "next/navigation";

const sections = [
    {
        title: 'Supply statistics',
        firstIcon: <Avatar src="/assets/flexsquarelogo.png" alt="logo" sx={{ height: 40, width: 40, borderRadius: 0 }} />,
        secondIcon: <FaCoins style={{ color: grey[50] }} />,
        thirdIcon: <BiSolidCoinStack style={{ color: grey[50], fontSize: 23 }} />,
        firstText: ['20.00M', 'Total supply'],
        secondText: ['0.00M', 'Total staked'],
        thirdText: ['0.00M', 'Total circulating'],
        cta: 'Buy FLEX'
    },
    {
        title: 'bFLEX stats',
        firstIcon: <RiCopperCoinFill style={{ color: grey[50] }} />,
        secondIcon: <FaCoins style={{ color: grey[50] }} />,
        thirdIcon: <FaDollarSign style={{ color: grey[50], fontSize: 23 }} />,
        firstText: ['1,000 bFLEX', 'Total bFLEX'],
        secondText: ['0 bFLEX', 'Sold'],
        thirdText: ['250 USDT', 'Price'],
        cta: 'Buy bFLEX'
    },
    {
        title: 'Daily Auctions',
        firstIcon: <RiAuctionFill style={{ color: grey[50], fontSize: 23 }} />,
        secondIcon: <MdDateRange style={{ color: grey[50], fontSize: 23 }} />,
        thirdIcon: <BiSolidCoinStack style={{ color: grey[50], fontSize: 23 }} />,
        firstText: ['150 days', 'Duration'],
        secondText: ['Day 1', 'Current day'],
        thirdText: ['0.00M FLEX', 'Minted via auctions'],
        cta: 'Participate'
    }
];
const GlobalStats = () => {
    // web3
    const { buyBFLEX } = useBuyBFLEX();
    const { approve } = useApprove();
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const { data: currentDay } = useGetCurrentDay();
    const { data: circulatingSupply } = useGetTotalSupply();
    const { data: allocatedSupply } = useGetAllocatedSupply();
    const { data: soldBFLEX, refetch: refetchBFLEX } = useGetSoldBFLEX();
    const { data: allowance, refetch: refetchAllowance } = useGetAllowanceUSDT();
    //Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const router = useRouter();

    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Buy bFLEX');

    const handleApproveAndBuyBFLEX = async () => {
        const usdtAmount = parseEther('250');
        if (BigInt(usdtAmount) > BigInt(allowance || 0)) {
            try {
                const tx = await approve(flexContracts.bFLEX, usdtAmount); 
                setModalSubmitted(true);
                setButtonText('Approving...');
                setIsDisabled(true);
                const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
                setModalSubmitted(false);
                if (receipt.status !== 'success') {
                    setModalRejection(true); // Show "Transaction Failed" modal
                    return;
                }
                setIsDisabled(false);
                setModalSuccess(true); // Show success modal
                refetchAllowance();
                setButtonText('Buy bFLEX');
                return;
            } catch (err) {
                setModalSubmitted(false);
                if (err?.message?.includes('User rejected') || err?.shortMessage?.includes('User rejected')) {
                  console.warn("User rejected approval transaction.");
                } else {
                  console.error("Approval tx error:", err);
                }
                setModalRejection(true);
                setButtonText('Approve & Buy');
                return;
            }
        }
        try {
            const txHash = await buyBFLEX(1); 
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            setButtonText('Buying...');
            setIsDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            await refetchBFLEX();
            await refetchAllowance();
            setModalSuccess(true);
            setIsDisabled(false);
            setButtonText('Buy bFLEX');
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
            setButtonText('Buy bFLEX');
        }
    };

    function handleSupply() {
        const circulating = circulatingSupply ? (Number(formatEther(circulatingSupply)) / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : 0;
        const total = allocatedSupply ? (Number(formatEther(allocatedSupply)) / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : 0;
        const staked = circulating && total ? Number(formatEther(allocatedSupply)) - Number(formatEther(circulatingSupply)) : 0;
        const stakedFinal = (staked / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        return [circulating, total, stakedFinal];
    };
    const [circulating, total, staked] = handleSupply();

    useEffect(() => {
        if (parseEther('250') > allowance) {
            setButtonText('Approve & Buy');
        }
    }, [allowance])

    function mintedToDay(currentDay) {
        const firstDays = [20_000_000, 14_000_000, 9_000_000];
        const dailyDeduction = 13_000;

        if (currentDay < 1) return 0;

        let totalMinted = 0;

        // Days 1–3
        for (let day = 1; day <= Math.min(currentDay, 3); day++) {
            totalMinted += firstDays[day - 1];
        }

        // Days 4+
        if (currentDay > 3) {
            let dailyMint = 9_000_000; // day 3 amount

            for (let day = 4; day <= currentDay; day++) {
                dailyMint -= dailyDeduction;
                if (dailyMint <= 0) break; // safety
                totalMinted += dailyMint;
            }
        }

        if (totalMinted > 1000000000) {
            return `${(totalMinted / 1000000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}B FLEX`;
        } else {
            return `${(totalMinted / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}M FLEX`;
        }
    }

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
                Global stats
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
                                    {id === 0 ? `${total}M` : section.firstText[0]}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    {section.firstText[1]}
                                </Typography>
                            </Grid>
                        </Grid>
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
                                    {id === 1 && soldBFLEX ? `${soldBFLEX}/1,000` :
                                    id === 2 ? currentDay :
                                    id === 0 ? `${staked}M` :
                                    section.secondText[0]}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    {section.secondText[1]}
                                </Typography>
                            </Grid>
                        </Grid>
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
                                    {id === 0 && circulatingSupply ? `${circulating}M` :
                                    id === 2 && currentDay ? mintedToDay(currentDay) :
                                    section.thirdText[0]}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    {section.thirdText[1]}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* CTA */}
                        <Grid container sx={{ width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' } }}>
                            {!address ?
                                <WalletConnectButton fullwidth={isMobile} />
                                :
                                <Button
                                    href={id === 0 && `https://pancakeswap.finance/swap?inputCurrency=${flexContracts.FLEX}&outputCurrency=0x55d398326f99059fF775485246999027B3197955`}
                                    target={id === 0 && "_blank"}
                                    disabled={id === 1 && isDisabled}
                                    onClick={() => {
                                        id === 1 ? handleApproveAndBuyBFLEX() :
                                        id === 2 && router.push("/auction");
                                    }}
                                    sx={{
                                        px: 2,
                                        height: 35,
                                        fontWeight: 600,
                                        borderRadius: 1,
                                        color: grey[900],
                                        background: grey[50],
                                        textTransform: 'none',
                                        ':disabled': { background: grey[700], color: grey[300] },
                                        width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' }
                                    }}
                                >
                                    {id === 1 ? buttonText : section.cta}
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            ))}
            <SuccessfullTransactionModal open={modalSuccess} setOpen={setModalSuccess} />
            <RejectedTransactionModal open={modalRejection} setOpen={setModalRejection} />
            <SubmittedTransactionModal open={modalSubmitted} setOpen={setModalSubmitted} />
        </Grid>
    );
};

export default GlobalStats;
