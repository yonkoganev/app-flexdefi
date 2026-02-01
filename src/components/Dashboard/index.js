import MyStats from "./mystats";
import { useAccount } from "wagmi";
import GlobalStats from "./globalstats";
import StakingStats from "./stakingstats";
import { grey } from "@mui/material/colors";
import MyAuctionStats from "./myauctionstats";
import MissingWalletBox from "../MissingWalletBox";
import { Avatar, Grid, Typography } from "@mui/material";
import { useGetCurrentDay } from "../web3/hooks/useGetCurrentDay";
import AuctionStats from "./auctionstats";
import CountdownBox from "./countdownbox";

const Dash = () => {
    const { data: currentDay } = useGetCurrentDay();
    const { address } = useAccount();
    return (
        <Grid container width="100%" display="flex" gap={2} my={10}>
            <Grid container width="100%" mb={1} direction="column" sx={{ mt: { lg: 5, md: 5, sm: 2, xs: 0 } }}>
                <Grid container display="flex" alignItems="center">
                    <Avatar src="/assets/bsclogo.png" sx={{ height: 35, width: 35 }} />
                    <Typography color={grey[50]} fontSize={35} fontWeight={900} ml={1}>
                        Dashboard
                    </Typography>
                </Grid>
                <Typography color={grey[50]} fontSize={16}>
                    Check your balances and view your latest activity data.
                </Typography>
            </Grid>
            {/* MC, Liquidity, Day */}
            <Grid container width="100%" gap={3}>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Total Market Cap
                    </Typography>
                    <Typography color={grey[500]} fontSize={22} fontWeight={900} mt={-0.5}>
                        $<span style={{ color: grey[50] }}>0.00</span>
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Total Liquidity
                    </Typography>
                    <Typography color={grey[500]} fontSize={22} fontWeight={900} mt={-0.5}>
                        $<span style={{ color: grey[50] }}>0.00</span>
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Current Day
                    </Typography>
                    <Typography color={grey[50]} fontSize={22} fontWeight={900} mt={-0.5}>
                        {currentDay ? currentDay : '0'}
                    </Typography>
                </Grid>
            </Grid>
            {address ?
                (
                    <>
                        <CountdownBox />
                        <MyAuctionStats />
                        <MyStats />
                        <GlobalStats />
                        <StakingStats />
                        <AuctionStats />
                    </>
                ) : (
                    <MissingWalletBox />
                )
            }
        </Grid>
    );
};

export default Dash;
