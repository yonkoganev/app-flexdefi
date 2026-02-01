import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ScalingCircles from "./animations/scalingcircles";
import FloatingCircles from "./animations/floatingcircles";
import FloatingCircles2 from "./animations/floatingcircles2";
import GaugeDiagram from "./animations/gaugediagram";
import { cardColor } from "@/constants/colors";

const Products = () => {
    return(
        <Grid container pt={15} sx={{ width: { lg: '70%', md: '80%', sm: '100%', xs: '100%' } }}>
            <Typography color={grey[50]} fontWeight={550} fontSize={35}>
                Explore Flex products.
            </Typography>
            <Typography color={grey[300]} fontWeight={550} fontSize={20} mt={1} pr={2}>
                Choose amongst several De-Fi products within the evolving Flex ecosystem.
            </Typography>
            <Grid container width="100%" mt={5} gap={2}>
                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        height: 250,
                        display: 'flex',
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        alignItems: 'flex-end',
                        background: cardColor,
                        width: { lg: '45%', md: '45%', sm: '100%', xs: '100%' }
                    }}
                >
                    <GaugeDiagram />
                    <Grid container direction="column" gap={2}>
                        <Typography color={grey[50]} fontSize={20} fontWeight={550}>
                            Daily Auctions
                        </Typography>
                        <Typography color={grey[300]} fontSize={16}>
                            Mint Flex, stake and receive daily payouts.
                        </Typography>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        height: 250,
                        display: 'flex',
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        alignItems: 'flex-end',
                        background: cardColor,
                        width: { lg: '45%', md: '45%', sm: '100%', xs: '100%' }
                    }}
                >
                    <FloatingCircles2 />
                    <Grid container direction="column" gap={2}>
                        <Typography color={grey[50]} fontSize={20} fontWeight={550}>
                            Mini-Predictions
                        </Typography>
                        <Typography color={grey[300]} fontSize={16}>
                            Predict crypto prices and win.
                        </Typography>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        height: 250,
                        display: 'flex',
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        alignItems: 'flex-end',
                        background: cardColor,
                        width: { lg: '45%', md: '45%', sm: '100%', xs: '100%' }
                    }}
                >
                    <FloatingCircles />
                    <Grid container direction="column" gap={2}>
                        <Typography color={grey[50]} fontSize={20} fontWeight={550}>
                            Flex Staking
                        </Typography>
                        <Typography color={grey[300]} fontSize={16}>
                            Stake your Flex and receive high-yield staking rewards.
                        </Typography>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        height: 250,
                        display: 'flex',
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        alignItems: 'flex-end',
                        background: cardColor,
                        width: { lg: '45%', md: '45%', sm: '100%', xs: '100%' }
                    }}
                >
                    <ScalingCircles />
                    <Grid container direction="column" gap={2}>
                        <Typography color={grey[50]} fontSize={20} fontWeight={550}>
                            Weekly Lottery
                        </Typography>
                        <Typography color={grey[300]} fontSize={16}>
                            Participate in weekly lottery by purchasing a ticket.
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Products;
