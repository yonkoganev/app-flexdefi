import { formatEther } from "viem";
import { SiTether } from "react-icons/si";
import { cyan, grey } from "@mui/material/colors";
import { Box, Grid, Typography } from "@mui/material";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { useGetTotalBPDHits } from "../web3/hooks/useGetTotalBPDHits";
import { useGetUniqueDonator } from "../web3/hooks/useGetUniqueDonators";
import { useGetAuctionGlobals } from "../web3/hooks/useGetAuctionGlobals";
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";

const AuctionStats = () => {
    // web3
    const { data: globals } = useGetAuctionGlobals();
    const { data: totalBPDHits } = useGetTotalBPDHits();
    const { data: uniqueDonators } = useGetUniqueDonator();

    function handleGlobals() {
        if (!globals) {
            return { staked: null, shares: null, sharePrice: null };
        }
        let totalDonated;
        totalDonated = Number(formatEther(globals?.[2]));
        if (totalDonated > 1000000) {
            totalDonated = `${(totalDonated / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}M`;
        } else if (totalDonated > 1000 && totalDonated < 1000000) {
            totalDonated = `${(totalDonated / 1000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}K`;
        } else {
            totalDonated = `${totalDonated.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        }
        return { totalDonated }
    }
    const { totalDonated } = handleGlobals();
    return(
        <Grid container
            sx={{
                py: 2,
                px: 3,
                border: 1,
                width: '100%',
                borderRadius: 1,
                background: cardColor,
                borderColor: borderColor
            }}
        >
            <Typography color={grey[50]} fontWeight={900} fontSize={24}>
                Auction stats
            </Typography>
            <Box
                sx={{
                    py: { xs: 0, sm: 2, md: 2, lg: 2 },
                    px: { xs: 0, sm: 3, md: 3, lg: 3 },
                    mt: { xs: 0, sm: 2, md: 2, lg: 2 },
                    border: { xs: 0, sm: 1, md: 1, lg: 1 },
                    width: '100%',
                    borderRadius: 1,
                    background: cardColor,
                    borderColor: { lg: borderColor, md: borderColor, sm: borderColor }
                }}
            >
                <Box
                    sx={{
                        my: 2,
                        borderRadius: 3,
                        background: lightCardColor
                    }}
                >
                    <Grid
                        container
                        display="flex"
                        p={2}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            gap: { xs: 3, sm: 3, md: 0, lg: 0 },
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
                            alignItems: { xs: 'start', sm: 'start', md: 'center', lg: 'center' },
                            justifyContent: { xs: 'left', sm: 'left', md: 'space-between', lg: 'space-between' }
                        }}
                    >
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[400],
                                    justifyContent: 'center'
                                }}
                            >
                                <SiTether style={{ color: grey[50], fontSize: 25 }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {totalDonated}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Total contributed
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[400],
                                    justifyContent: 'center'
                                }}
                            >
                                <GroupsRoundedIcon style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {uniqueDonators && uniqueDonators}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Unique contributors
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[800],
                                    justifyContent: 'center'
                                }}
                            >
                                <CalendarMonthRoundedIcon style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    150 days
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Auction duration
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[800],
                                    justifyContent: 'center'
                                }}
                            >
                                <EmojiEventsRoundedIcon style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>{totalBPDHits}</Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Total BigPayDays
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
};

export default AuctionStats;
