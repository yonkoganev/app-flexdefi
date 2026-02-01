import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

const TopBox = () => {
    return(
        <Box
            sx={{
                height: 250,
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                background: blue[200],
                "@keyframes rotate": {
                    "0%": { transform: 'rotate(-30deg)' },
                    "50%": { transform: 'rotate(30deg)' },
                    "100%": { transform: 'rotate(-30deg)' }
                }
            }}
        >
            <Box
                sx={{
                    top: 20,
                    width: '100%',
                    zIndex: 990,
                    aspectRatio: '1/1',
                    borderRadius: '50%',
                    position: 'absolute',
                    animation: 'rotate 45s ease-in-out infinite',
                    background: `linear-gradient(to right, ${blue[50]} 50%, ${blue[400]} 50%)`
                }}
            >
                <Box
                    sx={{
                        zIndex: 991,
                        top: '50%',
                        left: '50%',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        position: 'absolute',
                        transform: 'translate(-50%, -50%)',
                        background: `linear-gradient(to right, ${blue[400]} 50%, ${blue[50]} 50%)`
                    }}
                />
            </Box>
        </Box>
    );
};

export default TopBox;
