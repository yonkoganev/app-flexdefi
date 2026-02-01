import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { useBNBPrice } from "./useBNBPrice";
import { green, grey, orange, red } from "@mui/material/colors";
import { useCountdownToTimestamp } from "./useCountdownToTimestamp";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useGetRoundData } from "../web3/hooks/predictions/useGetRoundData";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { Box, Button, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { useGetCurrentRound } from "../web3/hooks/predictions/useGetCurrentRound";

const PredictionsPanel = () => {
    const { data: currentRound } = useGetCurrentRound();
    const { data: roundData } = useGetRoundData({ id: currentRound ? currentRound : 1 });
    const price = useBNBPrice();
    const [progress, setProgress] = useState(0);
    const startTimestamp = roundData?.[0];   // betting starts
    const lockTimestamp = roundData?.[1];   // betting closes
    const closeTimestamp = roundData?.[2];  // round ends

    const lockCountdown = useCountdownToTimestamp(lockTimestamp);
    const closeCountdown = useCountdownToTimestamp(closeTimestamp);
    const formatTime = ({ hours, minutes, seconds }) =>
        `${hours.toString().padStart(2, "0")}:` +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`;

    const lockedPrice = roundData?.[3];
    const longPool = Number(formatEther(roundData?.[5] ?? 0n));
    const shortPool = Number(formatEther(roundData?.[6] ?? 0n));
    const prizePool = longPool + shortPool;
    const shortOdds = prizePool === 0 ? '1.00' : (prizePool / shortPool).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    const longOdds = prizePool === 0 ? '1.00' : (prizePool / longPool).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    const barColor = closeCountdown.isFinished ? red[400] : lockCountdown.isFinished ? orange[400] : green[400];

    useEffect(() => {
        if (!startTimestamp || !lockTimestamp) return;

        const updateProgress = () => {
            const now = Math.floor(Date.now() / 1000);
            const pct = ((now - Number(startTimestamp)) / 600) * 100;
            setProgress(Math.max(0, Math.min(100, pct)));
        };

        updateProgress(); // run immediately
        const interval = setInterval(updateProgress, 1000);

        return () => clearInterval(interval);
    }, [startTimestamp, lockTimestamp]);

    return(
        <Grid
            size={{ lg: 4, md: 4, sm: 12, xs: 12 }}
            sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                background: '#292e42',
                borderColor: '#383d4f'
            }}
        >
            {/* Predictions Panel */}
            <Box
                sx={{
                    p: 3,
                    border: 1,
                    width: '100%',
                    borderRadius: 1,
                    position: 'relative',
                    borderColor: '#383d4f'
                }}
            >
                <Box sx={{ width: '100%', position: 'absolute', top: 5, left: 0 }}>
                    <Grid container display="flex" alignItems="center" gap={1} mb={0.5}>
                        <PlayCircleOutlineRoundedIcon sx={{ ml: 1 }} />
                        <Typography color={grey[50]} fontWeight={600} fontSize={18}>Live</Typography>
                    </Grid>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 8,
                            backgroundColor: '#383d4f',
                            '& .MuiLinearProgress-bar1Determinate': {
                            backgroundColor: barColor,
                            transition: 'background-color 0.3s ease'
                            }
                        }}
                    />
                </Box>
                <Typography color={grey[50]} fontSize={28} fontWeight={600} mt={3}>Round #{currentRound}</Typography>
                <Typography color={grey[400]} mt={1} fontSize={13}>
                    Try to predict if the <span style={{ color: orange[400] }}>BNB</span> price will
                    be higher or lower when the round ends. Bet against each other and earn USDT.
                </Typography>
                <Typography color={grey[300]} mt={1} fontSize={16}>
                    Prize pool:
                    <span style={{ color: green[200], fontWeight: 600, marginLeft: 3 }}>
                        {prizePool.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} USDT
                    </span>
                </Typography>
                <Typography color={grey[300]} fontSize={16}>
                    My bet:
                    <span style={{ color: green[200], fontWeight: 600, marginLeft: 3 }}>0.00 USDT</span>
                </Typography>
                <Typography color={grey[300]} fontSize={16} mt={1}>
                    Betting window closes in:
                    <span style={{ color: lockCountdown.isFinished ? red[400] : grey[50], marginLeft: 3, fontWeight: 900 }}>
                        {lockCountdown.isFinished ? "Closed" : `${formatTime(lockCountdown)}`}
                    </span>
                </Typography>
                <Typography color={grey[300]} fontSize={16} mb={1}>
                    Round finishes in:
                    <span style={{ color: closeCountdown.isFinished ? red[400] : grey[50], marginLeft: 3, fontWeight: 900 }}>
                        {closeCountdown.isFinished ? "Finished" : `${formatTime(closeCountdown)}`}
                    </span>
                </Typography>
                <Typography color={grey[300]} fontSize={16}>
                    Locked <span style={{ color: orange[400] }}>BNB</span> price:
                        <span style={{ fontWeight: 900, marginLeft: 3 }}>
                            ${(Number(lockedPrice) / 100000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 } )}
                        </span>
                </Typography>
                <Typography color={grey[300]} fontSize={16}>
                    Current <span style={{ color: orange[400] }}>BNB</span> price:
                    <span style={{ fontWeight: 900, marginLeft: 3 }}>
                        {price ? `$${Number(price).toFixed(2)}` : '$0.00'}
                    </span>
                </Typography>
                <Grid container width="100%" mt={2}>
                    <TextField
                        onChange={(e) => handleChange(e.target.value)}
                        type="number"
                        size="small"
                        placeholder={
                            lockCountdown.isFinished
                            ? "Betting closed"
                            : "Enter USDT amount"
                        }
                        InputProps={{
                            readOnly: lockCountdown.isFinished || closeCountdown.isFinished,
                        }}
                        sx={{
                            flexGrow: 1,
                            borderRadius: 1,
                            backgroundColor: "#383d4f",
                            opacity: lockCountdown.isFinished ? 0.6 : 1,
                            pointerEvents: lockCountdown.isFinished ? "none" : "auto",

                            "& .MuiInputBase-input": {
                            height: 35,
                            padding: "0 10px",
                            lineHeight: "35px",
                            color: grey[50],
                            fontWeight: 900,
                            cursor: lockCountdown.isFinished ? "not-allowed" : "text",
                            },

                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                            WebkitAppearance: "none",
                            margin: 0,
                            },
                            "& input[type=number]": {
                            MozAppearance: "textfield",
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                            },
                        }}
                    />
                </Grid>
                <Grid container width="100%" display="flex" justifyContent="space-between" gap={1} mt={2}>
                    {lockCountdown.isFinished ?
                    (
                        <Button
                            disabled
                            sx={{
                                mt: 1,
                                height: 35,
                                flexGrow: 1,
                                color: grey[50],
                                fontWeight: 550,
                                borderRadius: 1,
                                textTransform: 'none',
                                background: grey[700],
                                ':disabled': { color: grey[300] }
                            }}
                        >
                            Betting closed
                        </Button>
                    )
                    :
                    (
                        <>
                            <Button
                                endIcon={<ArrowUpwardRoundedIcon />}
                                sx={{
                                    mt: 1,
                                    height: 35,
                                    flexGrow: 1,
                                    width: '45%',
                                    fontWeight: 550,
                                    borderRadius: 1,
                                    color: grey[50],
                                    textTransform: 'none',
                                    background: green[400]
                                }}
                            >
                                UP {longOdds}x
                            </Button>
                            <Button
                                endIcon={<ArrowDownwardRoundedIcon />}
                                sx={{
                                    mt: 1,
                                    height: 35,
                                    flexGrow: 1,
                                    width: '45%',
                                    fontWeight: 900,
                                    borderRadius: 1,
                                    color: grey[50],
                                    textTransform: 'none',
                                    background: red[400]
                                }}
                            >
                                DOWN {shortOdds}x
                            </Button>
                        </>
                    )
                    }
                </Grid>
            </Box>
        </Grid>
    );
};

export default PredictionsPanel;
