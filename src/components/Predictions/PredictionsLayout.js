import { formatEther } from "viem";
import { grey } from "@mui/material/colors";
import PastPredictionPanel from "./PastPredictionPanel";
import { Avatar, Grid, Typography } from "@mui/material";
import FuturePredictionPanel from "./FuturePredictionPanel";
import CurrentPredictionPanel from "./CurrentPredictionPanel";
import { useGetRoundData } from "../web3/hooks/predictions/useGetRoundData";
import { useGetCurrentRound } from "../web3/hooks/predictions/useGetCurrentRound";
import MissingWalletBox from "../MissingWalletBox";
import { useAccount } from "wagmi";

const PredictionsLayout = () => {
    const { address } = useAccount();
    const { data: currentRound } = useGetCurrentRound();
    const { data: roundData } = useGetRoundData({ id: currentRound ? currentRound : 1 });
    const longPool = Number(formatEther(roundData?.[5] ?? 0n));
    const shortPool = Number(formatEther(roundData?.[6] ?? 0n));
    const prizePool = longPool + shortPool;

    return (
        <Grid container width="100%" display="flex" gap={2} my={10}>
            <Grid container width="100%" mb={1} direction="column" sx={{ mt: { lg: 5, md: 5, sm: 2, xs: 0 } }}>
                <Grid container display="flex" alignItems="center">
                    <Avatar src="/assets/bsclogo.png" sx={{ height: 35, width: 35 }} />
                    <Typography color={grey[50]} fontSize={35} fontWeight={900} ml={1}>
                        Predictions
                    </Typography>
                </Grid>
                <Typography color={grey[400]} fontSize={16} sx={{ width: { lg: '40%', md: '50%', sm: '100%', xs: '100%' } }}>
                    Try to predict if the BNB price will be higher or lower when the round ends. Bet against each other and earn USDT.
                </Typography>
            </Grid>
            {/* Total staked, Daily inflation, Current day */}
            <Grid container width="100%" gap={3}>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        USDT contributed
                    </Typography>
                    <Typography color={grey[500]} fontSize={22} fontWeight={900} mt={-0.5}>
                        <span style={{ color: grey[50] }}>{prizePool.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span> USDT
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Current Round
                    </Typography>
                    <Typography color={grey[50]} fontSize={22} fontWeight={900} mt={-0.5}>
                        #{currentRound}
                    </Typography>
                </Grid>
            </Grid>
            {address ?
                (
                <Grid container width="100%" display="flex" justifyContent="center" flexDirection="row">
                    <PastPredictionPanel />
                    <CurrentPredictionPanel />
                    <FuturePredictionPanel />
                </Grid>
                ) : (
                    <MissingWalletBox />
                )
            }
        </Grid>
    );
};

export default PredictionsLayout;
