import { Box, Grid } from "@mui/material";
import { cyan, grey } from "@mui/material/colors";

const Secured = () => {
    return(
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: grey[100],
                "@keyframes secured1": {
                    "0%": { width: '45%' },
                    "10%": { width: '45%' },
                    "40%": { width: '28%' },
                    "60%": { width: '28%' },
                    "90%": { width: '45%' },
                    "100%": { width: '45%' },
                },
                "@keyframes secured2": {
                    "0%": { width: '12.5%' },
                    "10%": { width: '12.5%' },
                    "40%": { width: '25%' },
                    "60%": { width: '25%' },
                    "90%": { width: '12.5%' },
                    "100%": { width: '12.5%' },
                },
                "@keyframes secured3": {
                    "0%": { width: '12.5%' },
                    "10%": { width: '12.5%' },
                    "40%": { width: '18%' },
                    "60%": { width: '18%' },
                    "90%": { width: '12.5%' },
                    "100%": { width: '12.5%' },
                },
                "@keyframes secured4": {
                    "0%": { width: '35%' },
                    "10%": { width: '35%' },
                    "40%": { width: '28%' },
                    "60%": { width: '28%' },
                    "90%": { width: '35%' },
                    "100%": { width: '35%' },
                },
                "@keyframes secured5": {
                    "0%": { width: '35%' },
                    "10%": { width: '35%' },
                    "40%": { width: '28%' },
                    "60%": { width: '28%' },
                    "90%": { width: '35%' },
                    "100%": { width: '35%' },
                }
            }}
        >
            {/* FirstRow */}
            <Grid container position="absolute" top={-50} height="100%" width="100%" display="flex" justifyContent="right" alignItems="center" right={20}>
                {/* FirstBox */}
                <Box
                    sx={{
                        width: '40%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[800],
                        animation: 'secured1 3s ease-in-out infinite'
                    }}
                />
                {/* Circle */}
                <Box
                    sx={{
                        ml: 2,
                        height: '15%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        background: `linear-gradient(to right, ${cyan[500]} 50%, ${cyan[800]} 50%)`
                    }}
                />
                {/* ThirdBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '10%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[500],
                        animation: 'secured2 3s ease-in-out infinite'
                    }}
                />
                {/* FourthBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '10%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[500],
                        animation: 'secured3 3s ease-in-out infinite'
                    }}
                />
            </Grid>
            {/* SecondRow */}
            <Grid container position="absolute" top={0} height="100%" width="100%" display="flex" justifyContent="right" alignItems="center" right={-10}>
                {/* FirstBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '10%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[500],
                        animation: 'secured2 3s ease-in-out infinite'
                    }}
                />
                {/* SecondBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '10%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[800],
                        animation: 'secured5 3s ease-in-out infinite'
                    }}
                />
                {/* Circle */}
                <Box
                    sx={{
                        ml: 2,
                        height: '15%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        background: `linear-gradient(to right, ${cyan[500]} 50%, ${cyan[800]} 50%)`
                    }}
                />
                {/* ThirdBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '10%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[500],
                        animation: 'secured3 3s ease-in-out infinite'
                    }}
                />
            </Grid>
            {/* ThirdRow */}
            <Grid container position="absolute" top={50} height="100%" width="100%" display="flex" justifyContent="right" alignItems="center" right={0}>
                {/* Circle */}
                <Box
                    sx={{
                        ml: 2,
                        height: '15%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        background: `linear-gradient(to right, ${cyan[500]} 50%, ${cyan[800]} 50%)`
                    }}
                />
                {/* FirstBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '28%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[500],
                        animation: 'secured4 3s ease-in-out infinite 0.1s'
                    }}
                />
                {/* SecondBox */}
                <Box
                    sx={{
                        ml: 2,
                        width: '10%',
                        height: '10%',
                        borderRadius: 50,
                        background: cyan[800],
                        animation: 'secured2 3s ease-in-out infinite 0.1s'
                    }}
                />
            </Grid>
        </Box>
    );
};

export default Secured;
