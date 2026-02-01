import { formatEther, parseEther } from "viem";
import BettingPanel from "./BettingPanel";
import { blue, grey} from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useBNBPrice } from "./useBNBPrice";
import { motion, useAnimation } from "framer-motion";
import { usePredictionEvents } from "./usePredictionEvents";
import { useCountdownToTimestamp } from "./useCountdownToTimestamp";
import { useGetHasBet } from "../web3/hooks/predictions/useGetHasBet";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useGetRoundData } from "../web3/hooks/predictions/useGetRoundData";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { useGetCurrentRound } from "../web3/hooks/predictions/useGetCurrentRound";
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { Box, Button, CircularProgress, Grid, IconButton, lighten, LinearProgress, Typography } from "@mui/material";
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";

const CurrentPredictionPanel = () => {
    const { data: currentRound, refetch: refetchRoundId } = useGetCurrentRound();
    const { data: roundData, refetch: refetchRoundData } = useGetRoundData({ id: currentRound ? currentRound : 1 });

    const price = useBNBPrice();
    const [progress, setProgress] = useState(0);

    // Animation
    const controls = useAnimation();

    // Timing
    const startTimestamp = roundData?.[0];   // betting starts
    const lockTimestamp = roundData?.[1];   // betting closes
    const closeTimestamp = roundData?.[2];  // round ends
    const lockCountdown = useCountdownToTimestamp(lockTimestamp);
    const closeCountdown = useCountdownToTimestamp(closeTimestamp);

    // Loading
    const [loading, setLoading] = useState(false);

    // Betting
    const [isBetting, setIsBetting] = useState(false);
    const [positionType, setPositionType] = useState('long');

    const formatTime = ({ hours, minutes, seconds }) =>
        `${hours.toString().padStart(2, "0")}:` +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`;

    // Prices & Pools & Odds
    const startPrice = Number(roundData?.[3] ?? 0n);
    const priceDiff = (price - (startPrice / 100000000)).toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 4 });
    const longPool = Number(formatEther(roundData?.[5] ?? 0n));
    const shortPool = Number(formatEther(roundData?.[6] ?? 0n));
    const prizePool = longPool + shortPool;
    const shortOdds = prizePool === 0 ? '1.00' : shortPool === 0 ? '0.00' : (prizePool / shortPool).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    const longOdds = prizePool === 0 ? '1.00' : longPool === 0 ? '0.00' : (prizePool / longPool).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    const winners = startPrice / 100000000 > price ? 'short' : 'long';

    // Colors
    const colors = winners === 'short' ? '#ec4c9e' : '#32d0aa';

    const refetch = async () => {
        await Promise.all([
            refetchRoundData(),
            refetchRoundId()
        ]);
    }

    useEffect(() => {
        if (!startTimestamp || !lockTimestamp) return;

        const updateProgress = () => {
            const now = Math.floor(Date.now() / 1000);
            const pct = ((now - Number(startTimestamp)) / 3600) * 100;
            setProgress(Math.max(0, Math.min(100, pct)));
        };

        updateProgress(); // run immediately
        const interval = setInterval(updateProgress, 1000);

        return () => clearInterval(interval);
    }, [startTimestamp, lockTimestamp, closeCountdown.isFinished]);

    usePredictionEvents(() => {
        setLoading(false);
        refetch();
        setIsBetting(false);
    });

    useEffect(() => {
        if (closeCountdown.isFinished) {
            setLoading(true);
        } else setLoading(false);
    }, [closeCountdown.isFinished]);

    // Animation
    const goToBetting = async () => {
        await controls.start({
            scale: 1,
            rotateY: -90,
            translateZ: 80,
            transition: { duration: 0.25, ease: "linear" },
        });

        setIsBetting(true);

        await controls.start({
            scale: 1.05,
            rotateY: -180,
            translateZ: 0,
            transition: { duration: 0.25, ease: "linear" },
        });
    };

    const goBack = async () => {
        await controls.start({
            scale: 1.05,
            rotateY: -90,
            transition: { duration: 0.25, ease: "linear" },
        });

        setIsBetting(false);

        await controls.start({
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.25, ease: "linear" },
        });
    };

    return(
    <Box sx={{ perspective: 1400, perspectiveOrigin: "50% 50%" }}>
        <motion.div
            animate={controls}
            initial={{ rotateY: 0 }}
            style={{
                perspective: 1200,
                transformStyle: "preserve-3d",
                width: 370,
            }}
        >
        <Grid
            sx={{
                height: 400,
                border: 1,
                flexGrow: 1,
                maxWidth: 370,
                borderRadius: 3,
                overflow: 'hidden',
                background: cardColor,
                borderColor: borderColor,
                transition: "transform 0.6s ease",
                transform: isBetting ? "rotateY(0deg)" : "rotateY(0deg)",
            }}
        >
            {/* Predictions Panel */}
            <Box
                sx={{
                    p: isBetting ? 0 : 3,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                    {!isBetting ?
                    (
                        <>
                            {/* Header */}
                            <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
                                <Grid container display="flex" alignItems="center" justifyContent="space-between" mb={0.5} py={0.5}>
                                    <Grid container display="flex" alignItems="center" gap={1} pl={2}>
                                        <PlayCircleOutlineRoundedIcon sx={{ color: grey[400] }} />
                                        <Typography color={grey[400]} fontWeight={600} fontSize={18}>{lockCountdown.isFinished ? 'Closed' : 'Live'}</Typography>
                                    </Grid>
                                    <Grid container display="flex" alignItems="center" gap={1} pr={2}>
                                        <Typography color={grey[400]} fontWeight={600} fontSize={18}>#{currentRound}</Typography>
                                    </Grid>
                                    <Box width="100%" mt={0.5} position="relative">
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress}
                                            sx={{
                                                height: 20,
                                                backgroundColor: borderColor,
                                                '& .MuiLinearProgress-bar1Determinate': {
                                                backgroundColor: blue[400],
                                                transition: 'background-color 0.3s ease'
                                                }
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                top: '50%',
                                                left: '50%',
                                                width: '100%',
                                                fontSize: 14,
                                                color: grey[50],
                                                fontWeight: 900,
                                                textAlign: 'center',
                                                position: 'absolute',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            {lockCountdown.isFinished ? `Betting closed. Results in: ${formatTime(closeCountdown)}` : `Betting closes in: ${formatTime(lockCountdown)}`}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Box>
                            {/* UpButton */}
                            <Button
                                onClick={() => {
                                    goToBetting();
                                    setPositionType('long');
                                }}
                                disabled={lockCountdown.isFinished}
                                sx={{
                                    py: 1,
                                    mt: 7,
                                    width: '75%',
                                    textTransform: 'none',
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                    color: winners === 'long' ? grey[50] : '#32d0aa',
                                    background: loading ? lightCardColor : winners === 'long' ? '#32d0aa' : lightCardColor,
                                    ':hover': { background: winners === 'long' ? '#71cbb6ff' : lighten(cardColor, 0.05) }
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
                                    borderColor: loading ? lightCardColor : colors
                                }}
                            >
                                {!loading ?
                                    (
                                        <>
                                            <Typography fontSize={11} fontWeight={900}>
                                                LAST PRICE
                                            </Typography>
                                            <Grid container display="flex" justifyContent="space-between" mt={1}>
                                                <Typography fontSize={22} fontWeight={1000} color={colors}>
                                                    ${price && price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                                        </>
                                    ) : (
                                        <Grid container width="100%" display="flex" justifyContent="center" gap={3}>
                                            <CircularProgress sx={{ mt: 1 }} />
                                            <Typography width="100%" textAlign="center" color={grey[50]} fontSize={12} fontWeight={900} sx={{ textDecoration: 'underline' }}>
                                                Calculating prices...
                                            </Typography>
                                        </Grid>
                                    )
                                }
                            </Box>
                            {/* DownButton */}
                            <Button
                                disabled={lockCountdown.isFinished}
                                onClick={() => {
                                    goToBetting();
                                    setPositionType('short');
                                }}
                                sx={{
                                    py: 1,
                                    width: '75%',
                                    textTransform: 'none',
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    color: winners === 'long' ? grey[50] : '#ec4c9e',
                                    background: loading ? lightCardColor : winners === 'long' ? lightCardColor : '#ec4c9e',
                                    ':hover': { background: winners === 'long' ? lighten(cardColor, 0.05) : '#c63f85ff' }
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
                        </>
                    ) : (
                        <BettingPanel onClose={goBack} positionType={positionType} roundId={currentRound} onChange={refetch} />
                    )}
            </Box>
        </Grid>
        </motion.div>
    </Box>
    );
};

export default CurrentPredictionPanel;
