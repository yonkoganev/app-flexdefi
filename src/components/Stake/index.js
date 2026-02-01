import { useState } from "react";
import { formatEther } from "viem";
import StakePanel from "./stakepanel";
import StakeStats from "./stakestats";
import StakesList from "./stakeslist";
import { grey } from "@mui/material/colors";
import { Avatar, Grid, Typography } from "@mui/material";
import { useGetStakes } from "../web3/hooks/useGetStakes";
import { useGetGlobals } from "../web3/hooks/useGetGlobals";
import { useGetCurrentDay } from "../web3/hooks/useGetCurrentDay";
import { useAccount } from "wagmi";
import MissingWalletBox from "../MissingWalletBox";

const Staking = () => {
    // web3
    const { address } = useAccount();
    const { data: globals, refetch: refetchGlobals } = useGetGlobals();
    const { data: currentDay } = useGetCurrentDay();
    const { data: stakes, refetch: refetchStakes } = useGetStakes({ offset: 0, length: 10 });

    const [previewAmount, setPreviewAmount] = useState(null);
    const [previewDays, setPreviewDays] = useState(null);
    const [previewIrrevocable, setPreviewIrrevocable] = useState(false);

    const refetch = async () => {
        await Promise.all([
            refetchStakes(),
            refetchGlobals()
        ]);
    };
    function calculateInflationRate() {
        const day = currentDay ? currentDay : 0;
        const START = 2;        // 2% per day
        const END = 0.005427;   // 0.005427% per day
        const START_DAY = 2;
        const END_DAY = 150;    // inclusive

        if (day < START_DAY) return `${START.toFixed(2)}%`;
        if (day >= END_DAY) return `${END.toFixed(4)}%`;

        return `${(START - ((START - END) * (day - START_DAY)) / (END_DAY - START_DAY)).toFixed(4)}%`;
    }
    function handleGlobals() {
        if (!globals) {
            return { staked: null, shares: null, sharePrice: null };
        }
        let staked;
        staked = Number(formatEther(globals?.[0]));
        if (staked > 1000000) {
            staked = `${(staked / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}M`;
        } else if (staked > 1000 && staked < 1000000) {
            staked = `${(staked / 1000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}K`;
        } else {
            staked = `${staked.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        }
        let shares;
        shares = Number(formatEther(globals?.[1]));
        if (shares > 1000000) {
            shares = `${(shares / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}M`;
        } else if (shares > 1000 && shares < 1000000) {
            shares = `${(shares / 1000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}K`;
        } else {
            shares = `${shares.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        }
        let sharePrice;
        sharePrice = Number(formatEther(globals?.[2])) * 10;
        if (sharePrice > 1000000) {
            sharePrice = `${(sharePrice / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        } else if (sharePrice > 1000 && sharePrice < 1000000) {
            sharePrice = `${(sharePrice / 1000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        } else {
            sharePrice = `${sharePrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        }
        return { staked, shares, sharePrice }
    }
    const { staked, shares, sharePrice } = handleGlobals();
    return (
        <Grid container width="100%" display="flex" gap={2} my={10}>
            <Grid container width="100%" mb={1} direction="column" sx={{ mt: { lg: 5, md: 5, sm: 2, xs: 0 } }}>
                <Grid container display="flex" alignItems="center">
                    <Avatar src="/assets/bsclogo.png" sx={{ height: 35, width: 35 }} />
                    <Typography color={grey[50]} fontSize={35} fontWeight={900} ml={1}>
                        Staking
                    </Typography>
                </Grid>
                <Typography color={grey[50]} fontSize={16}>
                    Stake FLEX tokens to receive high-yield FLEX and USDT rewards.
                </Typography>
            </Grid>
            {/* Total staked, Daily inflation, Current day */}
            <Grid container width="100%" gap={3}>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Total Staked
                    </Typography>
                    <Typography color={grey[500]} fontSize={22} fontWeight={900} mt={-0.5}>
                        <span style={{ color: grey[50] }}>{globals && staked}</span> FLEX
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Current inflation
                    </Typography>
                    <Typography color={grey[50]} fontSize={22} fontWeight={900} mt={-0.5}>
                        {calculateInflationRate()}
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Day
                    </Typography>
                    <Typography color={grey[50]} fontSize={22} fontWeight={900} mt={-0.5}>
                        {currentDay}
                    </Typography>
                </Grid>
            </Grid>
            {address ?
                (
                    <>
                        <Grid container display="flex" justifyContent="center" gap={2} width="100%">
                            <StakePanel onStakeCreated={refetchStakes} onIrrevocableChange={setPreviewIrrevocable} onDaysChange={setPreviewDays} onAmountChange={setPreviewAmount} />
                            <StakeStats amount={previewAmount} days={previewDays} irrevocable={previewIrrevocable} />
                        </Grid>
                        <Grid container display="flex" justifyContent="center" gap={2} width="100%">
                            <StakesList stakes={stakes} onChange={refetch} />
                        </Grid>
                    </>
                ) : (
                    <MissingWalletBox />
                )
            }
        </Grid>
    );
};

export default Staking;
