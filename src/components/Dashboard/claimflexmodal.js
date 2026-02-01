import { usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { blue, grey } from "@mui/material/colors";
import StakingDaysInput from "./StakingDaysInput";
import { useClaimFLEX } from "../web3/hooks/useClaimFLEX";
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import { Box, Button, FormControlLabel, Grid, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import { borderColor, cardColor } from "@/constants/colors";

const ClaimFlexModal = ({ open, setOpen, amount, onClaim }) => {
    // web3
    const publicClient = usePublicClient();
    const { claimLiquid, claimStake } = useClaimFLEX();

    //Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const [days, setDays] = useState("150");
    const [isDisabled, setIsDisabled] = useState(false);
    const [claimType, setClaimType] = useState("stake");
    const [buttonText, setButtonText] = useState('Claim');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        if (claimType === 'stake') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [claimType]);

    const handleClaim = async () => {
        try {
            const txHash = claimType === "stake" ? await claimStake(days) : await claimLiquid();
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            setButtonText('Claiming...');
            setButtonDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            await onClaim?.();
            setOpen(false);
            setModalSuccess(true);
            setButtonDisabled(false);
            setButtonText('Claim');
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
            setButtonText('Claim');
        }
    };
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
                            Claim FLEX
                        </Typography>
                        <Typography color={grey[400]} mt={1} fontSize={13}>
                            Claim your FLEX tokens as a stake or liquid. If you claim FLEX as liquid even once, you lose
                            your <span style={{ color: blue[100], fontWeight: 900 }}>BigPayDay</span> eligibility.
                        </Typography>
                        <Typography color={grey[50]} mt={2} fontSize={16}>
                            Available to claim: <span style={{ color: blue[100], fontWeight: 900 }}>{amount} FLEX</span>
                        </Typography>
                        <Grid container width="100%">
                            <RadioGroup
                                value={claimType}
                                onChange={(e) => setClaimType(e.target.value)}
                                sx={{ mt: 1, gap: 1, width: '100%' }}
                            >
                                <Grid container width="100%" display="flex" gap={1}>
                                    <FormControlLabel value="stake"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: grey[400],
                                                    '&.Mui-checked': { color: blue[400] }
                                                }}
                                            />
                                        }
                                        label={<Typography color={grey[50]} fontWeight={600} pr={2}>Stake</Typography>}
                                        sx={{
                                            m: 0,
                                            py: 0.5,
                                            flexGrow: 1,
                                            width: '45%',
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: claimType === "stake" ? blue[400] : borderColor,
                                            background: claimType === "stake" ? 'rgba(33,150,243,0.08)' : 'transparent'
                                        }}
                                    />
                                    <FormControlLabel value="liquid"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: grey[400],
                                                    '&.Mui-checked': {
                                                        color: blue[400],
                                                    }
                                                }}
                                            />
                                        }
                                        label={<Typography color={grey[50]} fontWeight={600} pr={2}>Liquid</Typography>}
                                        sx={{
                                            m: 0,
                                            py: 0.5,
                                            flexGrow: 1,
                                            width: '45%',
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: claimType === "liquid" ? blue[400] : borderColor,
                                            background: claimType === "liquid" ? 'rgba(33,150,243,0.08)' : 'transparent'
                                        }}
                                    />
                                </Grid>
                            </RadioGroup>
                        </Grid>
                        <Grid container width="100%">
                            <Typography color={grey[50]} mt={2} fontSize={16}>
                                Enter staking days:
                            </Typography>
                        </Grid>
                        <Grid container width="100%" mt={0.5}>
                            <StakingDaysInput value={days} onChange={setDays} disabled={isDisabled} />
                        </Grid>
                        <Grid container width="100%" gap={1} mt={3}>
                            <Button
                                onClick={handleClaim}
                                disabled={buttonDisabled}
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

export default ClaimFlexModal;
