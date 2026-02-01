import { usePublicClient } from "wagmi";
import { useState, useEffect } from "react";
import StakeNameInput from "./StakeNameInput";
import { formatEther, parseEther } from "viem";
import StakingDaysInput from "./StakingDaysInput";
import { useStake } from "../web3/hooks/useStake";
import { blue, grey, red } from "@mui/material/colors";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useGetBalanceOfFLEX } from "../web3/hooks/useGetBalanceOfFLEX";
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import { Box, Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { useGetBalanceOfBFLEX } from "../web3/hooks/useGetBalanceOfBFLEX";
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";

const StakePanel = ({ onStakeCreated, onAmountChange, onDaysChange, onIrrevocableChange }) => {
    //Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const [days, setDays] = useState(7);
    const [amount, setAmount] = useState(0);
    const [stakeName, setStakeName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [irrevocable, setIrrevocable] = useState(false);
    const [buttonText, setButtonText] = useState('Enter FLEX amount');

    // web3
    const publicClient = usePublicClient();
    const { data: flexBalance, refetch: refetchBalance } = useGetBalanceOfFLEX();
    const { createStake } = useStake();
    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setAmount("");
            return;
        }

        try {
            parseEther(value);
            setAmount(value);
            onAmountChange?.(value);
        } catch {
            setAmount("invalid");
        }
    };

    function changeDays(newDays) {
        setDays(newDays);
        onDaysChange?.(newDays);
    }

    useEffect(() => {
        // 1️⃣ Stake name (highest priority)
        if (!stakeName?.trim()) {
            setIsDisabled(true);
            setButtonText("Enter stake name");
            return;
        }

        // 2️⃣ Amount
        if (!amount || amount === "invalid" || Number(amount) < 0.00001) {
            setIsDisabled(true);
            setButtonText("Enter stake amount");
            return;
        }

        try {
            if (parseEther(amount) > (flexBalance ?? 0n)) {
                setIsDisabled(true);
                setButtonText("Insufficient FLEX balance");
                return;
            }
        } catch {
            setIsDisabled(true);
            setButtonText("Invalid amount");
            return;
        }

        // 3️⃣ Days
        if (!days || Number(days) < 7) {
            setIsDisabled(true);
            setButtonText("Enter staking days");
            return;
        }

        // 4️⃣ All good
        setIsDisabled(false);
        setButtonText("Stake FLEX");
    }, [stakeName, amount, days, flexBalance]);

    const handleStake = async () => {
        try {
            const amountWei = parseEther(amount);
            const txHash = await createStake({ description: stakeName, amount: amountWei, days: days, irrevocable: irrevocable }); 
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            setButtonText('Staking...');
            setIsDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            refetchBalance();
            onStakeCreated?.();
            setModalSuccess(true);
            setIsDisabled(false);
            setButtonText('Stake FLEX');
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
            setButtonText('Stake FLEX');
        }
    };

    return(
        <Grid
            size={{ lg: 4, md: 5.8, sm: 12, xs: 12 }}
            sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                background: cardColor,
                borderColor: borderColor
            }}
        >
            {/* Staking Panel */}
            <Box
                sx={{
                    p: 3,
                    border: 1,
                    width: '100%',
                    borderRadius: 1,
                    borderColor: borderColor
                }}
            >
                <Typography color={grey[50]} fontSize={28} fontWeight={600}>Set stake params</Typography>
                <Typography color={grey[400]} mt={1} fontSize={13}>
                    Enter stake name, amount and days. <span style={{ color: blue[100], fontWeight: 600 }}>Minimum</span> staking
                    days is 7 days and <span style={{ color: blue[100], fontWeight: 600 }}>maximum</span> is 3653 days.
                </Typography>
                <Typography color={grey[50]} mt={2} fontSize={15} fontWeight={600} display="flex" flexDirection="row" alignItems="center" gap={0.5}>
                    FLEX Balance:
                    <span style={{ color: blue[100], fontWeight: 600 }}>
                        {flexBalance && Number(formatEther(flexBalance)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </Typography>
                {/* Stake name */}
                <Grid container mt={2} mb={1} gap={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography color={grey[50]} fontWeight={550}>Stake name:</Typography>
                    <Grid container width="60%">
                        <StakeNameInput value={stakeName} onChange={setStakeName} />
                    </Grid>
                </Grid>
                {/* Stake amount */}
                <Grid container my={1} gap={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography color={grey[50]} fontWeight={550}>FLEX amount:</Typography>
                    <Grid container width="60%">
                        <TextField
                            onChange={(e) => handleChange(e)}
                            type="number"
                            size="small"
                            placeholder="Enter FLEX amount"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
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
                        
                                /* Remove arrows (Chrome, Safari, Edge) */
                                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                    WebkitAppearance: "none",
                                    margin: 0,
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield", // Firefox
                                },
                                ':hover': { borderColor: 'transparent' },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "transparent",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'transparent',
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'transparent',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                {/* Stake duration */}
                <Grid container my={1} gap={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography color={grey[50]} fontWeight={550}>Stake duration:</Typography>
                    <Grid container width="60%">
                        <StakingDaysInput value={days} onChange={changeDays} />
                    </Grid>
                </Grid>
                {/* Irrevocable */}
                <Grid container my={1} display="flex" alignItems="center">
                    <Typography color={grey[50]} fontWeight={550}>Irrevocable:</Typography>
                    <Checkbox
                        checked={irrevocable}
                        onChange={(e) => {
                            setIrrevocable(e.target.checked);
                            onIrrevocableChange?.(e.target.checked);
                        }}
                        icon={<CancelOutlinedIcon sx={{ color: red[500] }} />}
                        checkedIcon={<CheckCircleIcon sx={{ color: '#69f0ae' }} />}
                    />
                </Grid>
                <Button
                    fullWidth
                    disabled={isDisabled}
                    onClick={() => handleStake()}
                    sx={{
                        mt: 1,
                        height: 35,
                        fontWeight: 550,
                        borderRadius: 1,
                        color: grey[50],
                        textTransform: 'none',
                        background: `linear-gradient(to right, ${blue[900]}, ${blue[500]})`,
                        ':disabled': { background: grey[700], color: grey[300] }
                    }}
                >
                    {buttonText}
                </Button>
            </Box>
            <SuccessfullTransactionModal open={modalSuccess} setOpen={setModalSuccess} />
            <RejectedTransactionModal open={modalRejection} setOpen={setModalRejection} />
            <SubmittedTransactionModal open={modalSubmitted} setOpen={setModalSubmitted} />
        </Grid>
    );
};

export default StakePanel;
