import { Box, Grid } from "@mui/material";
import { grey, orange, red } from "@mui/material/colors";

const GaugeDiagram = () => {
  return (
    <Grid container display="flex" alignItems="center" position="absolute" justifyContent="center" sx={{ top: 0, right: 70 }}> 
        {/* Circle 1 */}
        <Box
            sx={{
                opacity: 0.8,
                right: -70,
                width: 240,
                height: 240,
                display: 'flex',
                borderRadius: "50%",
                alignItems: 'center',
                position: "absolute",
                background: orange[100],
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    border: 40,
                    width: '70%',
                    height: '70%',
                    borderRadius: '50%',
                    borderColor: orange[600],
                    background: 'transparent'
                }}
            />
            <Box
                sx={{
                    width: '63%',
                    height: '63%',
                    borderRadius: '50%',
                    position: 'absolute',
                    borderColor: red[600],
                    background: 'transparent',
                    "@keyframes rotatingCircleDiagram": {
                        "0%": { transform: 'rotate(0deg)' },
                        "50%": { transform: 'rotate(-75deg)' },
                        "100%": { transform: 'rotate(0deg)' },
                    },
                    animation: 'rotatingCircleDiagram 12s ease-in-out infinite'
                }}
            >
                <Box
                    bottom={0}
                    position="absolute"
                    sx={{
                        width: 60,
                        height: 60,
                        border: 10,
                        borderRadius: '50%',
                        bgcolor: orange[900],
                        borderColor: grey[50]
                    }}
                />
            </Box>
        </Box>
    </Grid>
  );
};

export default GaugeDiagram;
