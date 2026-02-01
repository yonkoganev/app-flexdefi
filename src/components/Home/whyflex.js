import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TopBox from "./animations/whyflex/topbox";
import BottomBox from "./animations/whyflex/bottombox";

const WhyFlex = () => {
    return (
        <Grid size={{ lg: 8.4, xs: 12 }} display="flex" justifyContent="space-between" sx={{ flexDirection: { lg: 'unset', md: 'unset', sm: 'column', xs: 'column' } }}>
            <Grid size={{ lg: 5, md: 4, sm: 12, xs: 12 }} pt={15}>
                {/* LEFT sticky column */}
                <Grid size={{ lg: 12 }} sx={{ position: "sticky", top: 120, zIndex: 998 }}>
                    <Typography color={grey[50]} fontWeight={600} fontSize={35}>
                        Why choose Flex?
                    </Typography>
                    <Typography color={grey[300]} fontWeight={550} fontSize={18} mt={2}>
                        Flex provides high-yield rewards in the form of Flex and USDT.
                    </Typography>
                </Grid>
            </Grid>
            <Grid size={{ lg: 6, md: 7, sm: 12, xs: 12 }} sx={{ pt: { lg: 15, md: 15, sm: 5, xs: 5 } }}>
                <Grid container width="100%" display="flex" justifyContent="space-between">
                    <TopBox />
                    <Grid container width="25%" mt={3}>
                        <Typography color={grey[50]} fontWeight={600} fontSize={22}>
                            Hybrid
                        </Typography>
                    </Grid>
                    <Grid container width="70%" mt={3}>
                        <Typography color={grey[300]} fontSize={16}>
                            Flexible staking mechanics providing hybrid-rewards in the form of FLEX and USDT.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container width="100%" mt={10} display="flex" justifyContent="space-between">
                    <BottomBox />
                    <Grid container width="25%" mt={3}>
                        <Typography color={grey[50]} fontWeight={600} fontSize={22}>
                            Growing
                        </Typography>
                    </Grid>
                    <Grid container width="70%" mt={3}>
                        <Typography color={grey[300]} fontSize={16}>
                            FLEX is a growing ecosystem constantly improving and releasing new financial products.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default WhyFlex;
