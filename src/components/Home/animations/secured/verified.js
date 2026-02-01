import { Box, Grid } from "@mui/material";
import { cyan, grey } from "@mui/material/colors";

const Verified = () => {
    return(
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: grey[100],
                "@keyframes movingX": {
                    "0%": { transform: 'translateX(0px)' },
                    "50%": { transform: 'translateX(15px)' },
                    "100%": { transform: 'translateX(0px)' }
                }
            }}
        >
            {/* Row */}
            <Grid container position="absolute" top={0} height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" right={20}>
                {/* Circle */}
                <Box
                    sx={{
                        ml: 2,
                        height: '15%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        transform: 'translateX(0px)',
                        animation: 'movingX 4s ease-in-out infinite',
                        background: `linear-gradient(to right, ${cyan[800]} 50%, ${cyan[500]} 50%)`
                    }}
                />
                {/* SecondCircle */}
                <Box
                    sx={{
                        ml: -1.5,
                        height: '17%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        transform: 'translateX(0px)',
                        animation: 'movingX 4s ease-in-out infinite 0.1s',
                        background: `linear-gradient(to right, ${cyan[800]} 50%, ${cyan[500]} 50%)`
                    }}
                />
                {/* ThirdCircle */}
                <Box
                    sx={{
                        ml: -2,
                        height: '22%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        transform: 'translateX(0px)',
                        animation: 'movingX 4s ease-in-out infinite 0.2s',
                        background: `linear-gradient(to right, ${cyan[800]} 50%, ${cyan[500]} 50%)`
                    }}
                />
                {/* FourthCircle */}
                <Box
                    sx={{
                        ml: -2.5,
                        height: '30%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        transform: 'translateX(0px)',
                        animation: 'movingX 4s ease-in-out infinite 0.3s',
                        background: `linear-gradient(to right, ${cyan[800]} 50%, ${cyan[500]} 50%)`
                    }}
                />
                {/* FifthCircle */}
                <Box
                    sx={{
                        ml: -3.5,
                        height: '50%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        transform: 'translateX(0px)',
                        animation: 'movingX 4s ease-in-out infinite 0.4s',
                        background: `linear-gradient(to right, ${cyan[800]} 50%, ${cyan[500]} 50%)`
                    }}
                />
            </Grid>
        </Box>
    );
};

export default Verified;
