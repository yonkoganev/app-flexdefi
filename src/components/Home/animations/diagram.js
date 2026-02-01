import { Box, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";

const Diagram = () => {
    return(
        <Box
            sx={{
                top: 0,
                right: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'end',
                aspectRatio: '1/1',
                position: 'absolute',
                justifyContent: 'left',
                "@keyframes color-change": {
                    "0%": { backgroundColor: blue[400] },
                    "50%": { backgroundColor: blue[100] },
                    "100%": { backgroundColor: blue[400] }
                }
            }}
        >
            <Grid container sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        bottom: 0,
                        width: 40,
                        height: 60,
                        zIndex: 990,
                        position: 'absolute',
                        background: blue[400],
                        animation: 'color-change 3s ease-in-out infinite 0s'
                    }}
                />
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        bottom: 40,
                        zIndex: 998,
                        borderRadius: '50%',
                        position: 'absolute',
                        background: blue[400],
                        animation: 'color-change 3s ease-in-out infinite 1.5s'
                    }}
                />
            </Grid>
            <Grid container sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        left: 45,
                        bottom: 0,
                        width: 40,
                        height: 80,
                        zIndex: 990,
                        position: 'absolute',
                        background: blue[400],
                        animation: 'color-change 3s ease-in-out infinite 1s'
                    }}
                />
                <Box
                    sx={{
                        left: 45,
                        width: 40,
                        height: 40,
                        bottom: 60,
                        zIndex: 998,
                        borderRadius: '50%',
                        position: 'absolute',
                        background: blue[400],
                        animation: 'color-change 3s ease-in-out infinite 2.5s'
                    }}
                />
            </Grid>
            <Grid container sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        left: 90,
                        bottom: 0,
                        width: 40,
                        height: 100,
                        zIndex: 990,
                        position: 'absolute',
                        background: blue[400],
                        animation: 'color-change 3s ease-in-out infinite 2s'
                    }}
                />
                <Box
                    sx={{
                        left: 90,
                        width: 40,
                        height: 40,
                        bottom: 80,
                        zIndex: 998,
                        borderRadius: '50%',
                        position: 'absolute',
                        background: blue[400],
                        animation: 'color-change 3s ease-in-out infinite 3.5s'
                    }}
                />
            </Grid>
        </Box>
    );
};

export default Diagram;
