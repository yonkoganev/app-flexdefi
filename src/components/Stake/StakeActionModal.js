import { usePublicClient } from "wagmi";
import { useState, useEffect } from "react";
import { formatEther, isAddress } from "viem";
import { blue, grey, red } from "@mui/material/colors";
import { useEndStake } from "../web3/hooks/useEndStake";
import { useRenameStake } from "../web3/hooks/useRenameStake";
import { day_length, launchTimestamp } from "@/constants/TimestampLaunch";
import { useTransferStake } from "../web3/hooks/useTransferStake";
import { useWithdrawRewards } from "../web3/hooks/useWithdrawRewards";
import { useGetEstimateClaim } from "../web3/hooks/useGetEstimateClaim";
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { borderColor, cardColor } from "@/constants/colors";

const actionTexts = [
    {
        title: 'Rename stake',
        fullDescription: 'Give your stake a new name to make it easier to recognize.',
        description: 'Enter new stake name:',
        inputLabel: 'Enter new name',
        cta: 'Rename',
        pendingCta: 'Renaming...'
    },
    {
        title: 'Transfer stake',
        fullDescription: 'Transfer stake ownership by specifying a new address. All future rewards will be earned by the recipient.',
        description: `Enter recipient's address:`,
        inputLabel: `Enter recipient's address`,
        cta: 'Transfer',
        pendingCta: 'Transfering...'
    },
    {
        title: 'Claim rewards',
        fullDescription: 'Early claims incur an fShares fee, lowering future rewards.',
        description: `Enter number of days to claim:`,
        inputLabel: `Enter number of days`,
        cta: 'Claim FLEX',
        pendingCta: 'Claiming...'
    },
    {
        title: 'End stake',
        fullDescription: 'End the stake with a 90% penalty on staked FLEX. Accured rewards are exempt from fees.',
        fullDescription2: 'This stake can be ended without any penalty, and all rewards will be paid in full.',
        cta: 'End stake',
        pendingCta: 'Ending...'
    }
];

// Action 0 - rename, 1 - transfer, 2 - claim rewards, 3 - end stake
const StakeActionModal = ({ open, setOpen, stake, onChange, action, currentDay }) => {
    // Input value
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const effectiveDays = action === 2 ? isDisabled ? 0 : inputValue === '' ? undefined : Number(inputValue) : undefined;


    // Days to claim
    const days = Number(inputValue);
    // web3
    const publicClient = usePublicClient();
    const { endStake } = useEndStake();
    const { withdrawRewards } = useWithdrawRewards();
    const { renameStake } = useRenameStake();
    const { transferStake } = useTransferStake();
    const { data: estimate, isLoading: estimateLoading, error: estimateError } = useGetEstimateClaim(stake?.id, effectiveDays);
    const withdrawDay = estimate?.[0];
    const rewardAmount = estimate?.[1] ?? 0n;
    const sharesPenalty = estimate?.[2] ?? 0n;
    const resetModalState = () => {
        setInputValue('');
        setInputError('');
        setIsDisabled(false);
        setButtonDisabled(false);
        setButtonText(actionTexts[action]?.cta);
    };
    useEffect(() => {
        if (!open) {
            resetModalState();
            return;
        }
        setInputValue('');
        setInputError('');
        if (action !== null && actionTexts[action]) {
            setButtonText(actionTexts[action].cta);
            setButtonDisabled(false);
        }
    }, [action, open]);

    // Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const [buttonText, setButtonText] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const actionConfig = actionTexts[action];
    if (!actionConfig) return null;

    if (!stake) return null;
    const { description, stakedAmount, startDay, endDay, shares, rewards, usdtrewards, id } = stake;
    const availableDays = Math.max(0, Math.min(currentDay, endDay) - Math.max(startDay, stake.withdrawDay ?? startDay));


    const handleExecute = async () => {
        const error = validateInput(inputValue);
        if (error) {
            setInputError(error);
            return;
        }
        try {
            let txHash;
            if (action === 0) {
                txHash = await renameStake(id, inputValue);
            } else if (action === 1) {
                txHash = await transferStake(id, inputValue);
            } else if (action === 2) {
                txHash = await withdrawRewards(id, effectiveDays);
            } else if (action === 3) {
                txHash = await endStake(id);
            }
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            setButtonText(actionTexts[action].pendingCta);
            setButtonDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            await onChange?.();
            setOpen(false);
            setModalSuccess(true);
            setButtonDisabled(false);
            setButtonText(actionTexts[action].cta);
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
            setButtonText(actionTexts[action].cta);
        }
    };

    function dayToTime(input) {
        const secondsInDay = day_length;
        const finalTimestamp = launchTimestamp + input * secondsInDay;
        const date = new Date(finalTimestamp * 1000);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        const suffix =
            day % 10 === 1 && day !== 11 ? 'st' :
            day % 10 === 2 && day !== 12 ? 'nd' :
            day % 10 === 3 && day !== 13 ? 'rd' :
            'th';
        return `${month} ${day}${suffix}, ${year}`;
    }

    const validateInput = (value) => {
        if (action === 0) {
            if (!value.trim()) return 'Name cannot be empty';
            if (value.length > 20) return 'Max 20 characters';
        }

        if (action === 1) {
            if (!isAddress(value)) return 'Invalid wallet address';
        }

        if (action === 2) {
            if (isDisabled) return '';
            const d = Number(value);
            if (!value || isNaN(d)) return 'Enter valid number of days';
            if (d < 0) return 'Days must be equal or greater than 0';

            if (d > availableDays) {
                return `Max claimable days: ${availableDays}`;
            }
        }
        return '';
    };

    const isCtaDisabled = buttonDisabled || (action !== 3 && !!validateInput(inputValue));

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        p: 2,
                        border: 1,
                        top: '50%',
                        left: '50%',
                        width: 370,
                        maxWidth: 400,
                        borderRadius: 1,
                        position: 'absolute',
                        background: cardColor,
                        borderColor: borderColor,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            border: 1,
                            width: '100%',
                            borderRadius: 1,
                            position: 'relative',
                            borderColor: borderColor
                        }}
                    >
                        <Typography color={grey[50]} fontSize={28} fontWeight={600}>
                            {actionTexts[action].title}
                        </Typography>
                        <Typography color={grey[200]} mt={1} fontSize={13}>
                            {action === 3 && currentDay >= endDay ? actionTexts[action].fullDescription2 : actionTexts[action].fullDescription}
                        </Typography>
                        {actionTexts[action].description &&
                            <Typography color={grey[50]} mt={2} fontSize={16}>
                                {actionTexts[action].description}
                            </Typography>
                        }
                        {action !== 3 &&
                            <Grid container width="100%" mt={0.5}>
                                <TextField
                                    value={isDisabled ? 'ALL' : inputValue}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setInputValue(v);
                                        setInputError(validateInput(v));
                                    }}
                                    disabled={isDisabled}
                                    error={!!inputError}
                                    helperText={inputError}
                                    placeholder={isDisabled ? 'Claiming all FLEX rewards' : actionConfig.inputLabel}
                                    type={action === 2 ? 'number' : 'text'}
                                    inputProps={{
                                        min: 0,
                                        step: action === 2 ? 1 : 'any',
                                        spellCheck: false,
                                        autoCorrect: 'off',
                                        autoCapitalize: 'off',
                                        maxLength: action === 0 ? 20 : undefined,
                                        inputMode: action === 2 ? 'numeric' : 'text'
                                    }}
                                    sx={{
                                        flexGrow: 1,
                                        borderRadius: 1,
                                        backgroundColor: borderColor,
                                        '& .MuiInputBase-input': {
                                            height: 35,
                                            padding: '0 10px',
                                            lineHeight: '35px',
                                            color: grey[50],
                                            fontWeight: 700
                                        },
                                        /* Remove arrows (Chrome, Safari, Edge) */
                                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                            WebkitAppearance: "none",
                                            margin: 0,
                                        },
                                        /* Placeholder when disabled */
                                        '& .MuiInputBase-input.Mui-disabled::placeholder': {
                                        color: grey[500],
                                        opacity: 1,
                                        },

                                        /* Disabled text color */
                                        '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: grey[500], // 🔑 important for Chrome
                                        },
                                    }}
                                />
                                {action === 2 && !isDisabled &&
                                    <Button
                                        onClick={() => {
                                            setIsDisabled(true);
                                            setInputValue('0');
                                            setInputError('');
                                        }}
                                        sx={{
                                            height: 35,
                                            minWidth: 60,
                                            borderRadius: 1,
                                            fontWeight: 700,
                                            color: grey[50],
                                            background: '#444a63',
                                            ':hover': { background: '#50577a' }
                                        }}
                                    >
                                        MAX
                                    </Button>
                                }
                                {isDisabled &&
                                    <Grid container width="100%" display="flex" alignItems="center">
                                        <Typography color={grey[400]} fontSize={13}>
                                            All rewards will be claimed.
                                        </Typography>
                                        <Button
                                            disableRipple
                                            onClick={() => {
                                                setIsDisabled(false);
                                                setInputValue('');
                                            }}
                                            sx={{
                                                color: blue[100],
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                textDecoration: 'underline',
                                                ":hover": { background: 'transparent', textDecoration: 'underline' }
                                            }}
                                        >
                                            Change
                                        </Button>
                                    </Grid>
                                }
                            </Grid>
                        }
                        {/* Stake data */}
                        <Grid container width="100%" gap={1} mt={3} direction="column">
                            <Typography color={grey[400]} fontSize={13}>
                                Stake name: <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>{description}</span>
                            </Typography>
                            <Typography color={grey[400]} fontSize={13}>
                                Stake amount:
                                <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>
                                    {Number(formatEther(stakedAmount)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} FLEX
                                </span>
                            </Typography>
                            <Typography color={grey[400]} fontSize={13}>
                                Stake fShares:
                                <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>
                                    {Number(formatEther(shares)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} fShares
                                </span>
                            </Typography>
                            <Typography color={grey[400]} fontSize={13}>
                                Start Day:
                                <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>
                                    {dayToTime(startDay)}
                                </span>
                            </Typography>
                            <Typography color={grey[400]} fontSize={13}>
                                End Day:
                                <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>
                                    {dayToTime(endDay)}
                                </span>
                            </Typography>
                            <Typography color={grey[400]} fontSize={13}>
                                Stake rewards:
                                <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>
                                    {Number(formatEther(rewards)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} FLEX
                                </span> |
                                <span style={{ color: blue[100], fontWeight: 600, marginLeft: 5 }}>
                                    {Number(formatEther(usdtrewards)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} USDT
                                </span>
                            </Typography>
                        </Grid>
                        {(action === 3 && currentDay < endDay) &&
                            <Typography color={red[400]} mt={2} fontSize={13} fontWeight={600}>
                                Penalty: {(Number(formatEther(stakedAmount)) * 90 / 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} FLEX (90% of the staked FLEX)
                            </Typography>
                        }
                        {action === 2 && (
                            <Grid container direction="column">
                                <Typography color={blue[100]} mt={2} fontSize={13} fontWeight={600}>
                                    FLEX to receive:{' '}
                                    {Number(formatEther(rewardAmount)).toLocaleString('en-US', {
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2
                                    })}{' '}
                                    FLEX
                                </Typography>

                                <Typography color={red[400]} mt={1} fontSize={13} fontWeight={600}>
                                    Penalty:{' '}
                                    {Number(formatEther(sharesPenalty)).toLocaleString('en-US', {
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2
                                    })}{' '}
                                    fShares (
                                    {(
                                        (Number(formatEther(sharesPenalty)) /
                                            Number(formatEther(shares))) *
                                        100
                                    ).toFixed(4)}
                                    % of stake fShares)
                                </Typography>
                            </Grid>
                        )}
                        {/* CTA */}
                        <Grid container width="100%" gap={1} mt={3}>
                            <Button
                                onClick={handleExecute}
                                disabled={isCtaDisabled}
                                fullWidth
                                sx={{
                                    height: 35,
                                    flexGrow: 1,
                                    width: '45%',
                                    borderRadius: 1,
                                    color: grey[50],
                                    fontWeight: 550,
                                    textTransform: 'none',
                                    background: blue[600],
                                    ":disabled": { background: grey[700], color: grey[300] }
                                }}
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
            <SuccessfullTransactionModal open={modalSuccess} setOpen={setModalSuccess} />
            <RejectedTransactionModal open={modalRejection} setOpen={setModalRejection} />
            <SubmittedTransactionModal open={modalSubmitted} setOpen={setModalSubmitted} />
        </>
    );
};

export default StakeActionModal;
