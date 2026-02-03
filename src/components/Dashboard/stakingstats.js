import { formatEther } from "viem";
import { FaCoins } from "react-icons/fa6";
import { SiShutterstock } from "react-icons/si";
import { cyan, grey } from "@mui/material/colors";
import { Box, Grid, Typography } from "@mui/material";
import { useGetGlobals } from "../web3/hooks/useGetGlobals";
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";

const StakingStats = () => {
    // web3
    const { data: globals } = useGetGlobals();

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
        if (shares > 1000000000) {
            shares = `${(shares / 1000000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}B`;
        } else if (shares > 1000000 && shares < 1000000000) {
            shares = `${(shares / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}M`;
        } else if (shares > 1000 && shares < 1000000) {
            shares = `${(shares / 1000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}K`;
        } else {
            shares = `${shares.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
        }
        let sharePrice;
        sharePrice = Number(formatEther(globals?.[2]));
        if (sharePrice > 1000 && sharePrice < 1000000) {
            sharePrice = `${(sharePrice / 1000).toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 })}`;
        } else {
            sharePrice = `${sharePrice.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 })}`;
        }
        const currentDay = globals?.[3];
        return { staked, shares, sharePrice, currentDay }
    }
    const { staked, shares, sharePrice, currentDay } = handleGlobals();

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
                Staking stats
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
                        {/* Total Staked */}
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
                                <FaCoins style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {globals && staked}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Total staked
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Total fShares */}
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
                                <SiShutterstock style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {globals && shares}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Total fShares
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* fShare Price */}
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
                                <AttachMoneyRoundedIcon style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {globals && sharePrice} FLEX
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    fShare price
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Inflation Rate */}
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
                                <PercentRoundedIcon style={{ color: grey[50] }} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>{calculateInflationRate()}</Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    Daily inflation
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
};

export default StakingStats;
