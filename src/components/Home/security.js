import { grey } from "@mui/material/colors";
import Secured from "./animations/secured/secured";
import { Box, Button, Grid, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Verified from "./animations/secured/verified";

const Security = () => {
    return(
        <Grid size={{ lg: 8.4 }} display="flex" justifyContent="space-between" pt={15} mb={15} flexDirection="column">
            {/* Header */}
            <Grid container direction="column" width="100%">
                <Typography color={grey[900]} fontSize={35} fontWeight={600}>
                    Secure and audited.
                </Typography>
                <Typography color={grey[600]} fontWeight={550} fontSize={18} mt={2}>
                    Secured and transparent.
                </Typography>
            </Grid>
            {/* FirstBox */}
            <Grid container mt={5} width="100%">
                {/* Left */}
                <Grid
                    height={250}
                    size={{ xs: 12, md: 6 }}
                    overflow="hidden"
                    sx={{
                        borderTopLeftRadius: 9,
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: { lg: 0, md: 0, sm: 9, xs: 9 },
                        borderBottomLeftRadius: { lg: 9, md: 9, sm: 0, xs: 0 }
                    }}
                >
                    <Secured />
                </Grid>
                {/* Right */}
                <Grid
                    height={250}
                    size={{ xs: 12, md: 6 }}
                    overflow="hidden"
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomRightRadius: 9,
                        borderTopRightRadius: { lg: 9, md: 9, sm: 0, xs: 0 },
                        borderBottomLeftRadius: { lg: 0, md: 0, sm: 9, xs: 9 }
                    }}
                >
                    <Box
                        sx={{
                            p: 5,
                            width: '100%',
                            height: '100%',
                            background: grey[50]
                        }}
                    >
                        <Typography color={grey[900]} fontWeight={550} fontSize={22}>
                            Extensive Audits
                        </Typography>
                        <Grid container width="100%" mt={3} pt={3} borderTop={1} borderColor={grey[200]}>
                            <Typography color={grey[700]} fontSize={16}>
                                Flex has gone through several audits ensuring security and transparency.
                            </Typography>
                        </Grid>
                        <Button
                            disableRipple
                            endIcon={<ArrowForwardRoundedIcon />}
                            sx={{
                                mt: 2,
                                height: 30,
                                fontSize: 16,
                                borderBottom: 1,
                                borderRadius: 0,
                                color: grey[900],
                                textTransform: 'none',
                                background: 'transparent'
                            }}
                        >
                            Learn more
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            {/* SecondBox */}
            <Grid container mt={5} width="100%">
                {/* Left */}
                <Grid
                    height={250}
                    overflow="hidden"
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        borderTopLeftRadius: 9,
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: { lg: 0, md: 0, sm: 9, xs: 9 },
                        borderBottomLeftRadius: { lg: 9, md: 9, sm: 0, xs: 0 }
                    }}
                >
                    <Verified />
                </Grid>
                {/* Right */}
                <Grid
                    height={250}
                    size={{ xs: 12, md: 6 }}
                    overflow="hidden"
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomRightRadius: 9,
                        borderTopRightRadius: { lg: 9, md: 9, sm: 0, xs: 0 },
                        borderBottomLeftRadius: { lg: 0, md: 0, sm: 9, xs: 9 }
                    }}
                >
                    <Box
                        sx={{
                            p: 5,
                            width: '100%',
                            height: '100%',
                            background: grey[50]
                        }}
                    >
                        <Typography color={grey[900]} fontWeight={550} fontSize={22}>
                            Public & Verified
                        </Typography>
                        <Grid container width="100%" mt={3} pt={3} borderTop={1} borderColor={grey[200]}>
                            <Typography color={grey[700]} fontSize={16}>
                                Flex smart contract have been published and verified on the blockchain.
                            </Typography>
                        </Grid>
                        <Button
                            disableRipple
                            endIcon={<ArrowForwardRoundedIcon />}
                            sx={{
                                mt: 2,
                                height: 30,
                                fontSize: 16,
                                borderBottom: 1,
                                borderRadius: 0,
                                color: grey[900],
                                textTransform: 'none',
                                background: 'transparent'
                            }}
                        >
                            Learn more
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Security;
