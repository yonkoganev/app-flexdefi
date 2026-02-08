import { useWithdrawDivid } from "@/components/web3/hooks/useWithdrawDivid";
import { Button, Grid } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import RejectedTransactionModal from "@/components/Modals/RejectedTransactionModal";
import SubmittedTransactionModal from "@/components/Modals/SubmittedTransactionModal";
import SuccessfullTransactionModal from "@/components/Modals/SuccessfulTransactionModal";
import { useState } from "react";

const Divid = () => {
    // Modals
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalRejection, setModalRejection] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);
    const { withdrawDiv, isPending } = useWithdrawDivid();
    const withdrawStake = async () => {
        try {
            const txHash = await withdrawDiv();
        
            setModalSubmitted(true);
        
            const receipt = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            });
            setModalSubmitted(false);
        
            if (receipt.status !== "success") {
                setModalRejection(true);
                return;
            }
            setModalSuccess(true);
        } catch (error) {
            setModalSubmitted(false);
            setModalRejection(true);
        }
    };
    return (
        <>
            <Grid container display="flex" justifyContent="center" width="100%">
                <Button
                    disabled={isPending}
                    onClick={() => withdrawStake()}
                    sx={{
                        mt: 30,
                        color: grey[50],
                        textTransform: 'none',
                        background: blue[400],
                        ":disabled": { background: grey[700], color: grey[200] }
                    }}
                >
                    Withdraw stake
                </Button>
            </Grid>

            <SuccessfullTransactionModal
                open={modalSuccess}
                setOpen={setModalSuccess}
            />
            <RejectedTransactionModal
                open={modalRejection}
                setOpen={setModalRejection}
            />
            <SubmittedTransactionModal
                open={modalSubmitted}
                setOpen={setModalSubmitted}
            />
        </>
    );
};

export default Divid;
