import Image from "next/image";
import { grey} from "@mui/material/colors";
import { useState, useEffect } from "react";
import { formatEther, parseEther } from "viem";
import { flexContracts } from "../web3/contracts";
import { useAccount, usePublicClient } from "wagmi";
import { useApprove } from "../web3/hooks/useApprove";
import { useBet } from "../web3/hooks/predictions/useBet";
import { useGetHasBet } from "../web3/hooks/predictions/useGetHasBet";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useGetBalanceOfUSDT } from "../web3/hooks/useGetBalanceOfUSDT";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useGetAllowancePrediction } from "../web3/hooks/predictions/useGetAllowancePredictions";
import { cardColor, lightCardColor } from "@/constants/colors";

const BettingPanel = ({ roundId, positionType, onClose, onChange }) => {
    // web3
    const { approve } = useApprove();
    const publicClient = usePublicClient();
    const { betLong, betShort } = useBet();
    const { data: usdtBalance, refetch: refetchBalance } = useGetBalanceOfUSDT();
    const { data: allowance, refetch: refetchAllowance } = useGetAllowancePrediction();
    const { data: hasBet, refetch: refetchHasBet } = useGetHasBet({ roundId: roundId });

    //Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const [amount, setAmount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Place position');

    const handleChange = (e) => {
            const value = e.target.value;
            if (value === "") {
                setAmount("");
                setIsDisabled(true);
                setButtonText("Enter USDT amount");
                return;
            }
            const floatVal = parseFloat(value);
            
            if (isNaN(floatVal) || floatVal < 5) {
                setAmount(value);
                setIsDisabled(true);
                setButtonText("USDT amount must be at least 5");
                return;
            }

            try {
                parseEther(value); // Validate format
            } catch (err) {
                setButtonText("Invalid number");
                setIsDisabled(true);
                return;
            }
            
            setAmount(value);
            setIsDisabled(false);
            setButtonText("Place position");
    };

    useEffect(() => {
        if (!hasBet) return;
        const amountstr = amount.toString();
        if (hasBet[0] > 0) {
            setIsDisabled(true);
            setButtonText("Already contributed"); 
        } else if (parseEther(amountstr) > usdtBalance) {
            setButtonText('Insufficient USDT balance');
        } else if (parseEther(amountstr) > allowance) {
            setButtonText('Approve');
        }
    }, [amount, allowance, usdtBalance, hasBet]);

    const handleApproveAndBet = async () => {
        const amountstr = parseEther(amount.toString());
        if (BigInt(amountstr) > BigInt(allowance || 0)) {
            try {
                const tx = await approve(flexContracts.predictions, amountstr); 
                setModalSubmitted(true);
                setButtonText('Approving...');
                setIsDisabled(true);
                const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
                setModalSubmitted(false);
                if (receipt.status !== 'success') {
                    setModalRejection(true); // Show "Transaction Failed" modal
                    return;
                }
                refetchAllowance();
                setIsDisabled(false);
                setModalSuccess(true); // Show success modal
                setButtonText('Place position');
                return;
            } catch (err) {
                setModalSubmitted(false);
                if (err?.message?.includes('User rejected') || err?.shortMessage?.includes('User rejected')) {
                    console.warn("User rejected approval transaction.");
                } else {
                    console.error("Approval tx error:", err);
                }
                setModalRejection(true);
                setButtonText('Approve');
                return;
            }
        }
        try {
            const amountWei = parseEther(amount);
            const txHash = positionType === "long" ? await betLong(amountWei) : await betShort(amountWei); 
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            setButtonText('Executing...');
            setIsDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            onClose();
            onChange();
            refetchAllowance();
            refetchHasBet();
            refetchBalance();
            setModalSuccess(true);
            setIsDisabled(false);
            setButtonText('Place position');
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
            onClose();
            setButtonText('Place position');
        }
    };
    return(
        <Box sx={{ transform: 'rotateY(180deg)', width: '100%', position: 'relative', height: '100%', top: 0, p: 3 }}>
            <Grid container width="100%" bgcolor={lightCardColor} display="flex" justifyContent="space-between" p={1} position="absolute" top={0} left={0} alignItems="center">
                <Grid container display="flex" alignItems="center">
                    <IconButton
                        onClick={onClose}
                        disableRipple
                        sx={{ ":hover": { background: 'transparent' } }}
                    >
                        <ArrowBackRoundedIcon sx={{ color: grey[50], ':hover': { color: grey[400] } }} />
                    </IconButton>
                    <Typography fontSize={18} color={grey[50]} fontWeight={900}>Set Position</Typography>
                </Grid>
                <Typography bgcolor={positionType === 'long' ? '#32d0aa' : '#ec4c9e'} color={grey[50]} px={1.5} fontSize={14} borderRadius={1} fontWeight={700} display="flex" alignItems="center" gap={0.5} height={35}>
                    {positionType === 'long' ? <ArrowUpwardRoundedIcon sx={{ fontSize: 20 }} /> : <ArrowDownwardRoundedIcon sx={{ fontSize: 20 }} />}
                    {positionType === 'long' ? 'UP' : 'DOWN'}
                </Typography>
            </Grid>
            <Grid container width="100%" display="flex" justifyContent="space-between" alignItems="center" mt={7}>
                <Typography color={grey[400]} fontSize={14} fontWeight={600}>
                    Commit:
                </Typography>
                <Grid container display="flex" alignItems="center" gap={0.5}>
                    <Image src="/assets/usdtlogo.png" alt="usdtlogo" height={23} width={23} />
                    <Typography color={grey[50]} fontSize={14} fontWeight={900}>
                        USDT
                    </Typography>
                </Grid>
            </Grid>
            {/* TextField */}
            <Grid container width="100%" mt={2}>
                <TextField
                    disabled={hasBet ? hasBet[0] > 0 : false}
                    onChange={(e) => handleChange(e)}
                    type="number"
                    size="small"
                    placeholder={hasBet && hasBet[0] > 0 ? "Already contributed" : "Enter USDT amount"}
                    sx={{
                        flexGrow: 1,
                        borderRadius: 1,
                        backgroundColor: lightCardColor,

                        "& .MuiInputBase-input": {
                            height: 35,
                            padding: "0 10px",
                            lineHeight: "35px",
                            color: grey[50],
                            fontWeight: 900,
                        },
                        "& .MuiInputBase-input.Mui-disabled::placeholder": {
                            color: grey[900],
                            opacity: 2,
                        },
                        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                            WebkitAppearance: "none",
                            margin: 0,
                        },
                        "& input[type=number]": {
                            MozAppearance: "textfield",
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                        },
                    }}
                />
            </Grid>
            <Grid container width="100%" mt={2} gap={0.5}>
                <Typography color={grey[400]} fontSize={14} fontWeight={600} letterSpacing="-0.3px">
                    USDT Balance: {Number(formatEther(usdtBalance ?? 0n)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </Typography>
                <Image src="/assets/usdtlogo.png" alt="usdtlogo" height={20} width={20} />
            </Grid>
            <Grid container width="100%" mt={3}>
                <Button
                    disabled={isDisabled}
                    fullWidth
                    onClick={() => handleApproveAndBet()}
                    sx={{
                        py: 0.5,
                        borderRadius: 1,
                        color: grey[900],
                        background: grey[50],
                        textTransform: 'none',
                        ":disabled": { background: grey[700], color: grey[200] }
                    }}
                >
                    {buttonText}
                </Button>
            </Grid>
            <Grid container width="100%" mt={4}>
                <Typography color={grey[400]} fontSize={12} fontWeight={600} letterSpacing="-0.3px">
                    You won&apos;t be able to remove or change your position once you enter it.
                </Typography>
                <Typography color={grey[400]} fontSize={12} fontWeight={600} letterSpacing="-0.3px" mt={1}>
                    Disclaimer: The results are based on the chainlink&apos;s oracle price.
                </Typography>
            </Grid>
            <SuccessfullTransactionModal open={modalSuccess} setOpen={setModalSuccess} />
            <RejectedTransactionModal open={modalRejection} setOpen={setModalRejection} />
            <SubmittedTransactionModal open={modalSubmitted} setOpen={setModalSubmitted} />
        </Box>
    );
};

export default BettingPanel;
