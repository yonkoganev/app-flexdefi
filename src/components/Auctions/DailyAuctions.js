import { formatEther } from "viem";
import AuctionPanel from "./AuctionPanel";
import { grey } from "@mui/material/colors";
import { Avatar, Grid, Typography } from "@mui/material";
import { useGetCurrentDay } from "../web3/hooks/useGetCurrentDay";
import { useGetAuctionStatsOfDay } from "../web3/hooks/useGetAuctionStatsOfDay";
import History from "./History";

const flexPerDay = [20000000, 14000000, 9000000];

const DailyAuctions = () => {
    // web3
    const { data: currentDay } = useGetCurrentDay()
    const { data: auctionStats } = useGetAuctionStatsOfDay({ day: currentDay ? currentDay : 0 });

    const dailyDeduction = 13000;

    function calculateDailyFlex() {
        if (!currentDay) return;
        if (currentDay < 4) {
            const day = currentDay ? currentDay - 1 : 0;
            const flexAmount = (Number(flexPerDay[day]) / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            return flexAmount
        } else {
            const flexAmount = (Number(flexPerDay[2] - currentDay * dailyDeduction) / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            return flexAmount
        }
    }

    return (
        <Grid container width="100%" display="flex" gap={2} my={10}>
            <Grid container width="100%" mb={1} direction="column" sx={{ mt: { lg: 5, md: 5, sm: 2, xs: 0 } }}>
                <Grid container display="flex" alignItems="center">
                    <Avatar src="/assets/bsclogo.png" sx={{ height: 35, width: 35 }} />
                    <Typography color={grey[50]} fontSize={35} fontWeight={900} ml={1}>
                        Daily Auctions
                    </Typography>
                </Grid>
                <Typography color={grey[300]} fontSize={16} sx={{ width: { lg: '50%', md: '60%', sm: '100%', xs: '100%' } }}>
                    Mint FLEX by depositing USDT into the daily auctions. Reserve your portion, claim as a stake and be eligible for a BigPayDay.
                </Typography>
            </Grid>
            {/* Total staked, Daily inflation, Current day */}
            <Grid container width="100%" gap={3}>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Today&apos;s mint
                    </Typography>
                    <Typography color={grey[500]} fontSize={22} fontWeight={900} mt={-0.5}>
                        {currentDay > 150 || currentDay < 1 ? ('-') : (
                            <>
                                <span style={{ color: grey[50] }}>
                                    {calculateDailyFlex()}
                                </span>
                                M FLEX
                            </>
                        )}
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Contributed
                    </Typography>
                    <Typography color={grey[50]} fontSize={22} fontWeight={900} mt={-0.5}>
                        {currentDay > 150 || currentDay < 1 ? <span style={{ color: grey[500] }}>-</span> : (
                        <>
                            <span style={{ color: grey[500] }}>$</span>
                            {auctionStats
                            ? Number(formatEther(auctionStats[1])).toLocaleString('en-US', {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                                })
                            : '0.00'}
                        </>
                        )}
                    </Typography>
                </Grid>
                <Grid container direction="column">
                    <Typography color={grey[500]} fontSize={14}>
                        Current Day
                    </Typography>
                    <Typography color={grey[50]} fontSize={22} fontWeight={900} mt={-0.5}>
                        {currentDay}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container width="100%" display="flex" justifyContent="center">
                {currentDay > 150 || currentDay < 1 ?
                    (
                        <Typography color={grey[50]} fontSize={24} mt={5}>
                            {currentDay > 150 ? 'Auction phase have ended on Day 150' : 'Auction phase starts on Day 1'}
                        </Typography>
                    ) : (
                        <>
                            <AuctionPanel />
                            <History />
                        </>
                    )
                }
            </Grid>
        </Grid>
    );
};

export default DailyAuctions;
