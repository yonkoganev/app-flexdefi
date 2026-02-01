import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { Countdown } from "./Countdown";
import { usePublicClient } from "wagmi";
import { blue, grey } from "@mui/material/colors";
import { useTriggerDay } from "../web3/hooks/useTriggerDay";
import { useTriggerBPD } from "../web3/hooks/useTriggerBPD";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetBUSDPool } from "../web3/hooks/useGetBUSDPool";
import RejectedTransactionModal from "../Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "../Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "../Modals/SuccessfulTransactionModal";
import { useGetLastCheckedSupplyDay } from "../web3/hooks/useGetLastCheckedSupplyDay";
import { useGetCurrentDay } from "../web3/hooks/useGetCurrentDay";
import { borderColor, cardColor } from "@/constants/colors";

const CountdownBox = () => {
    const { day, formatted } = Countdown();
    // web3
    const publicClient = usePublicClient();
    const { triggerDay } = useTriggerDay();
    const { triggerBPD } = useTriggerBPD();
    const { data: BUSDPool, refetch: refetchBUSDPool } = useGetBUSDPool();
    const { data: currentDay, refetch: refetchCurrentDay } = useGetCurrentDay();
    const { data: lastCheckedDay, refetch: refetchLastCheckedDay } = useGetLastCheckedSupplyDay();

    //Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    const [canConsumeBPD, setCanConsumeBPD] = useState(false);
    const [buttonText1, setButtonText1] = useState('Trigger Day');
    const [buttonText2, setButtonText2] = useState('Trigger BPD');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleExecute = async (type) => {
        try {
            const txHash = type === "bpd" ? await triggerBPD() : await triggerDay();
            console.log('TX Hash:', txHash);
            setModalSubmitted(true);
            type == "bpd" ? setButtonText2('Triggering...') : setButtonText1('Triggering...');
            setButtonDisabled(true);
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setModalSubmitted(false);

            if (receipt.status !== 'success') {
                setModalRejection(true);
                return;
            }
            await refetchBUSDPool();
            setModalSuccess(true);
            setButtonDisabled(false);
            type == "bpd" ? setButtonText2('Trigger BPD') : setButtonText1('Trigger Day');
        } catch (error) {
            setModalSubmitted(false);
            if (error?.message?.includes('User rejected') || error?.shortMessage?.includes('User rejected')) {
                console.warn("User rejected stake transaction.");
            } else {
                console.error("Stake tx error:", error);
            }
            setModalRejection(true);
            type == "bpd" ? setButtonText2('Trigger BPD') : setButtonText1('Trigger Day');
        }
    };

    useEffect(() => {
        if (!BUSDPool) return;
        if (Number(formatEther(BUSDPool)) >= 1000) {
            setCanConsumeBPD(true);
        } else setCanConsumeBPD(false);
    }, [BUSDPool])

    return(
        <Grid container
            sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                background: cardColor,
                borderColor: borderColor
            }}
        >
            <Box
                sx={{
                    p: 2,
                    border: 1,
                    width: '100%',
                    borderRadius: 1,
                    background: cardColor,
                    borderColor: borderColor
                }}
            >
                <Box
                    sx={{
                        borderRadius: 3,
                        alignItems: 'center',
                    }}
                >
                    <Typography color={grey[50]} fontWeight={900} fontSize={16}>
                        Day <span style={{ color: blue[200], fontWeight: 900 }}>{day}</span> | New day: <span style={{ color: blue[200], fontWeight: 900 }}>{formatted}</span>
                    </Typography>
                    <Grid container gap={1}>
                        {currentDay > 1 && lastCheckedDay < currentDay - 1 &&
                            <Button
                                fullWidth={!canConsumeBPD}
                                disabled={buttonDisabled}
                                onClick={() => {
                                    handleExecute("day");
                                }}
                                sx={{
                                    mt: 1,
                                    px: 3,
                                    fontWeight: 900,
                                    borderRadius: 1,
                                    color: grey[900],
                                    background: grey[50],
                                    textTransform: 'none',
                                    ":disabled": { background: grey[700], color: grey[400] }
                                }}
                            >
                                {buttonText1}
                            </Button>
                        }
                        {canConsumeBPD &&
                            <Button
                                disabled={buttonDisabled}
                                onClick={() => {
                                    handleExecute("bpd");
                                }}
                                sx={{
                                    mt: 1,
                                    px: 3,
                                    fontWeight: 900,
                                    borderRadius: 1,
                                    color: grey[900],
                                    background: grey[50],
                                    textTransform: 'none',
                                    ":disabled": { background: grey[700], color: grey[400] }
                                }}
                            >
                                {buttonText2}
                            </Button>
                        }
                    </Grid>
                </Box>
            </Box>
            <SuccessfullTransactionModal open={modalSuccess} setOpen={setModalSuccess} />
            <RejectedTransactionModal open={modalRejection} setOpen={setModalRejection} />
            <SubmittedTransactionModal open={modalSubmitted} setOpen={setModalSubmitted} />
        </Grid>
    );
};

export default CountdownBox;
