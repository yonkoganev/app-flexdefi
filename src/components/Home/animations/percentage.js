import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

const Percentage = () => {
    return(
        <Box
            sx={{
                top: 0,
                right: 0,
                height: '100%',
                display: 'flex',
                aspectRatio: '1/1',
                alignItems: 'center',
                position: 'absolute',
                justifyContent: 'center',
                "@keyframes blink": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                    "100%": { opacity: 1 }
                }
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        left: 0,
                        width: 42,
                        height: 42,
                        position: 'absolute',
                        borderRadius: '50%',
                        background: blue[400],
                        animation: 'blink 3s ease-in-out infinite 1.5s'
                    }}
                />
                <Box
                    sx={{
                        width: 15,
                        top: '35%',
                        left: '0%',
                        height: '135%',
                        borderRadius: 3,
                        rotate: '45deg',
                        position: 'absolute',
                        background: blue[400],
                        transform: 'translate(-50%, -50%)',
                        animation: 'blink 3s ease-in-out infinite 1s'
                    }}
                />
                <Box
                    sx={{
                        right: 0,
                        width: 42,
                        height: 42,
                        bottom: 0,
                        borderRadius: '50%',
                        position: 'absolute',
                        background: blue[400],
                        animation: 'blink 3s ease-in-out infinite'
                    }}
                />
            </Box>
        </Box>
    );
};

export default Percentage;
