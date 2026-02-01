import { formatEther } from "viem";
import { grey } from "@mui/material/colors";
import { Box, Button, Grid, lighten, Typography } from "@mui/material";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useGetRoundData } from "../web3/hooks/predictions/useGetRoundData";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { useGetCurrentRound } from "../web3/hooks/predictions/useGetCurrentRound";
import { usePredictionEvents } from "./usePredictionEvents";
import { useQueryClient } from "@tanstack/react-query";
import { cardColor, lightCardColor } from "@/constants/colors";

const PastPredictionPanel = () => {
    const queryClient = useQueryClient();
    const { data: currentRound } = useGetCurrentRound();
    const { data: roundData } = useGetRoundData({ id: currentRound ? Number(currentRound) - 1 : 2 });

    const startPrice = Number(roundData?.[3] ?? 0n);
    const closePrice = Number(roundData?.[4] ?? 0n);
    const priceDiff = ((closePrice - startPrice) / 100000000).toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 4 });
    const longPool = Number(formatEther(roundData?.[5] ?? 0n));
    const shortPool = Number(formatEther(roundData?.[6] ?? 0n));
    const prizePool = longPool + shortPool;
    const shortOdds = prizePool === 0 ? '1.00' : (prizePool / shortPool).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    const longOdds = prizePool === 0 ? '1.00' : (prizePool / longPool).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

    const winners = Number(startPrice) > Number(closePrice) ? 'short' : 'long';
    const colors = winners === 'short' ? '#ec4c9e' : '#32d0aa';

    usePredictionEvents(() => {
        queryClient.invalidateQueries({ queryKey: ["currentRound"] });
        queryClient.invalidateQueries({ queryKey: ["roundData"] });
    });

    return(
        <Grid
            sx={{
                scale: 0.9,
                opacity: 0.6,
                borderRadius: 3,
                flexGrow: 1,
                maxWidth: 370,
                overflow: 'hidden',
                background: lighten(cardColor, 0.05)
            }}
        >
            {/* Predictions Panel */}
            <Box
                sx={{
                    p: 3,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <Grid container display="flex" alignItems="center" justifyContent="space-between" mb={0.5} bgcolor={grey[700]} py={0.5} px={2}>
                        <Grid container display="flex" alignItems="center" gap={1}>
                            <DoNotDisturbAltIcon sx={{ color: grey[400] }} />
                            <Typography color={grey[400]} fontWeight={600} fontSize={18}>Finished</Typography>
                        </Grid>
                        <Grid container display="flex" alignItems="center" gap={1}>
                            <Typography color={grey[400]} fontWeight={600} fontSize={18}>#{Number(currentRound) - 1}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                {/* UpButton */}
                <Button
                    disableRipple
                    sx={{
                        py: 1,
                        mt: 5,
                        width: '75%',
                        textTransform: 'none',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        color: winners === 'long' ? grey[50] : '#32d0aa',
                        background: winners === 'long' ? '#32d0aa' : lightCardColor,
                        ':hover': { cursor: 'default' }
                    }}
                >
                    <Grid container direction="column">
                        <Typography fontWeight={900} fontSize={24} color={winners === 'long' ? grey[50] : '#32d0aa'}>
                            UP
                        </Typography>
                        <Typography fontWeight={900} fontSize={14} color={winners === 'long' ? grey[50] : grey[400]}>
                            {longOdds}x <span style={{ fontWeight: 400 }}>Payout</span>
                        </Typography>
                    </Grid>
                </Button>
                <Box
                    sx={{
                        p: 2,
                        border: 2,
                        width: '100%',
                        borderRadius: 4,
                        borderColor: colors
                    }}
                >
                    <Typography fontSize={11} fontWeight={900} color={grey[50]}>
                        CLOSED PRICE
                    </Typography>
                    <Grid container display="flex" justifyContent="space-between" mt={1}>
                        <Typography fontSize={22} fontWeight={1000} color={colors}>
                            ${(Number(closePrice) / 100000000).toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 4 })}
                        </Typography>
                        <Typography bgcolor={colors} color={grey[50]} px={1} py={0.5} borderRadius={1} fontWeight={700} display="flex" alignItems="center" gap={0.5}>
                            {winners === 'long' ? <ArrowUpwardRoundedIcon sx={{ fontSize: 20 }} /> : <ArrowDownwardRoundedIcon sx={{ fontSize: 20 }} />}
                            ${priceDiff}
                        </Typography>
                    </Grid>
                    <Grid container display="flex" justifyContent="space-between" mt={1}>
                        <Typography fontSize={14} fontWeight={600} color={grey[50]}>
                            Locked Price:
                        </Typography>
                        <Typography fontSize={14} fontWeight={600} color={grey[50]}>
                            ${(startPrice / 100000000).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                        </Typography>
                    </Grid>
                    <Grid container display="flex" justifyContent="space-between">
                        <Typography fontSize={16} fontWeight={900} color={grey[300]}>
                            Prize Pool:
                        </Typography>
                        <Typography fontSize={16} fontWeight={900} color={grey[50]}>
                            {prizePool.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} USDT
                        </Typography>
                    </Grid>
                </Box>
                {/* DownButton */}
                <Button
                    disableRipple
                    sx={{
                        py: 1,
                        width: '75%',
                        textTransform: 'none',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        color: winners === 'long' ? grey[50] : '#ec4c9e',
                        background: winners === 'long' ? lightCardColor : '#ec4c9e',
                        ':hover': { cursor: 'default' }
                    }}
                >
                    <Grid container direction="column">
                        <Typography fontWeight={900} fontSize={14} color={winners === 'short' ? grey[50] : grey[400]}>
                            {shortOdds}x <span style={{ fontWeight: 400 }}>Payout</span>
                        </Typography>
                        <Typography fontWeight={900} fontSize={24} color={winners === 'short' ? grey[50] : '#ec4c9e'}>
                            DOWN
                        </Typography>
                    </Grid>
                </Button>
            </Box>
        </Grid>
    );
};

export default PastPredictionPanel;
