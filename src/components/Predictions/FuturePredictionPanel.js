import { grey } from "@mui/material/colors";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCountdownToTimestamp } from "./useCountdownToTimestamp";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useGetRoundData } from "../web3/hooks/predictions/useGetRoundData";
import { useGetCurrentRound } from "../web3/hooks/predictions/useGetCurrentRound";
import { cardColor, lightCardColor } from "@/constants/colors";

const FuturePredictionPanel = () => {
    const { data: currentRound } = useGetCurrentRound();
    const { data: roundData } = useGetRoundData({ id: currentRound ? currentRound : 1 });

    const formatTime = ({ hours, minutes, seconds }) =>
        `${hours.toString().padStart(2, "0")}:` +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`;

    const newRoundTimestamp = Number(roundData?.[2]);  // round ends
    const nextRoundCountdown = useCountdownToTimestamp(newRoundTimestamp);

    return(
        <Grid
            sx={{
                scale: 0.9,
                flexGrow: 1,
                maxWidth: 370,
                borderRadius: 3,
                overflow: 'hidden',
                background: cardColor
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
                            <AccessTimeRoundedIcon sx={{ color: grey[400] }} />
                            <Typography color={grey[400]} fontWeight={600} fontSize={18}>Later</Typography>
                        </Grid>
                        <Grid container display="flex" alignItems="center" gap={1}>
                            <Typography color={grey[400]} fontWeight={600} fontSize={18}>#{Number(currentRound) + 1}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                {/* UpButton */}
                <Button
                    disabled
                    disableRipple
                    sx={{
                        py: 3,
                        mt: 5,
                        width: '75%',
                        textTransform: 'none',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        background: lightCardColor,
                    }}
                >
                    <Grid container direction="column">
                        <Typography fontWeight={900} fontSize={24} color={grey[50]}>
                            UP
                        </Typography>
                    </Grid>
                </Button>
                <Box
                    sx={{
                        p: 2,
                        border: 2,
                        width: '100%',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        borderColor: lightCardColor,
                        flexDirection: 'column',
                    }}
                >
                    <Typography color={grey[400]} fontWeight={900} fontSize={20}>
                        Entry starts
                    </Typography>
                    <Typography color={grey[400]} fontWeight={900} fontSize={24}>
                        ~{formatTime(nextRoundCountdown)}
                    </Typography>
                </Box>
                {/* DownButton */}
                <Button
                    disableRipple
                    sx={{
                        py: 3,
                        width: '75%',
                        textTransform: 'none',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        background: lightCardColor,
                    }}
                >
                    <Grid container direction="column">
                        <Typography fontWeight={900} fontSize={24} color={grey[50]}>
                            DOWN
                        </Typography>
                    </Grid>
                </Button>
            </Box>
        </Grid>
    );
};

export default FuturePredictionPanel;
