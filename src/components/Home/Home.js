
import FAQSection from "./faqs";
import Socials from "./socials";
import Image from "next/image";
import WhyFlex from "./whyflex";
import Products from "./Products";
import MeetFlex from "./meetflex";
import { useRouter } from "next/router";
import RotatingRing from "./rotatingring";
import Diagram from "./animations/diagram";
import EastIcon from '@mui/icons-material/East';
import { blue, green, grey, orange } from "@mui/material/colors";
import Percentage from "./animations/percentage";
import DotPattern from "./animations/dotpattern";
import Main from "./animations/movingboxes/main";
import CircleIcon from '@mui/icons-material/Circle';
import { borderColor, cardColor } from "@/constants/colors";
import { Box, Button, Grid, Typography } from "@mui/material";

const Home = () => {
    const router = useRouter();
    return (
        <>
            {/* HeroSection */}
            <Grid container display="flex" width="100%" px={2} alignItems="center" justifyContent="center" overflow="hidden" sx={{ mt: { lg: 20, md: 20, sm: 10, xs: 5 } }}>
                <Grid container my={3} width="100%" display="flex" justifyContent="center">
                    <Box
                        sx={{
                            pl: 2,
                            pr: 3,
                            gap: 1,
                            py: 0.5,
                            display: 'flex',
                            borderRadius: 50,
                            background: grey[900],
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircleIcon
                            sx={{
                                fontSize: 14,
                                color: orange[500],
                                "@keyframes BlinkingCircle": {
                                    "0%": { opacity: 0 },
                                    "50%": { opacity: 1 },
                                    "100%": { opacity: 0 }
                                },
                                animation: 'BlinkingCircle 3s ease-in-out infinite'
                            }}
                        />
                        <Typography color={grey[50]} fontSize={16}>
                            FLEX is live on Tesnet.
                        </Typography>
                    </Box>
                </Grid>
                <Grid container width="100%" justifyContent="center" display="flex">
                    <Typography color={grey[50]} fontWeight={600} sx={{ zIndex: 998, lineHeight: 1.1, fontSize: { lg: 50, md: 45, sm: 40, xs: 30 }, mr: 2 }}>
                        Say hello to 
                    </Typography>
                    <Image src="/assets/flexsquarelogo.png" alt="squarelogo" height={50} width={50} style={{ transform: 'rotate(-5deg)', zIndex: 998 }} />
                    <Typography color={grey[50]} fontWeight={600} sx={{ zIndex: 998, lineHeight: 1.1, fontSize: { lg: 50, md: 45, sm: 40, xs: 30 }, ml: 2 }}>
                        Flex App
                    </Typography>
                    <Grid container display="flex" justifyContent="center" mt={3} width="100%">
                        <Typography textAlign="center" color={grey[300]} sx={{ zIndex: 998 }} fontSize={18} fontWeight={550}>
                            Earn <span style={{ textDecoration: 'underline', color: blue[400] }}>high-yield</span> rewards by staking $FLEX, receive daily payouts and participate in mini-predictions dApp.
                        </Typography>
                    </Grid>
                    <Grid container width="100%" display="flex" justifyContent="center">
                        <Button
                            endIcon={<EastIcon />}
                            href="https://app.flexdefi.io"
                            target="_blank"
                            sx={{
                                px: 2,
                                mt: 3,
                                height: 40,
                                zIndex: 998,
                                fontSize: 16,
                                fontWeight: 600,
                                color: grey[50],
                                borderRadius: 50,
                                textTransform: 'none',
                                background: blue[400],
                                width: { lg: 'auto', md: 'auto', sm: 'auto', xs: '100%' }
                            }}
                        >
                            Explore dApp
                        </Button>
                    </Grid>
                </Grid>
                <RotatingRing />
            </Grid>
            {/* Tokenomics */}
            <Grid container display="flex" justifyContent="center" width="100%" gap={2} alignItems="stretch" zIndex={998} pb={15} pt={5} mt={20}>
                <Grid size={{ lg: 9 }} mb={3}>
                    <Typography color={grey[50]} fontSize={32} fontWeight={600}>DeFi high-yield staking protocol.</Typography>
                </Grid>
                <Grid size={{ lg: 4.5, xs: 12 }} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box
                        sx={{
                            p: 4,
                            border: 0,
                            flexGrow: 1,
                            height: 170,
                            width: '100%',
                            borderRadius: 5,
                            background: cardColor,
                        }}
                    >
                        <Grid container display="flex" justifyContent="space-between" height="100%" position="relative">
                            <Grid size={{ lg: 6 }} display="flex" height="100%" flexDirection="column" justifyContent="center">
                                <Typography color={grey[50]} fontWeight={900} sx={{ fontSize: { lg: 60, md: 50, sm: 40, xs: 40 } }} zIndex={999}>1.22B</Typography>
                                <Typography color={grey[300]} zIndex={999}>Minted through Auctions</Typography>
                            </Grid>
                            <Grid width="100%" height="100%" position="absolute">
                                <Percentage />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            flexGrow: 1,
                            height: 170,
                            width: '100%',
                            borderRadius: 5,
                            background: cardColor,
                        }}
                    >
                        <Grid container display="flex" justifyContent="space-between" height="100%" position="relative">
                            <Grid size={{ lg: 7 }} p={4} display="flex" height="100%" flexDirection="column" justifyContent="center">
                                <Typography color={grey[50]} fontWeight={900} zIndex={999} sx={{ fontSize: { lg: 60, md: 50, sm: 40, xs: 40 } }}>70%</Typography>
                                <Typography color={grey[300]} zIndex={999}>Allocated to Daily Payouts</Typography>
                            </Grid>
                            <Grid width="100%" height="100%" position="absolute">
                                <Diagram />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4.5, xs: 12 }} display="flex">
                    <Box
                        sx={{
                            p: 4,
                            flexGrow: 1,
                            flexShrink: 1,
                            width: '100%',
                            height: '100%',
                            minHeight: 350,
                            borderRadius: 5,
                            background: cardColor,
                        }}
                    >
                        <Grid container display="flex" justifyContent="space-between" height="100%" position="relative">
                            <Grid container display="flex" height="100%" flexDirection="column" justifyContent="left" position="absolute" top={0} left={0}>
                                <Typography color={grey[50]} fontSize={48} fontWeight={900} zIndex={999}>Flexible</Typography>
                                <Typography color={grey[300]} zIndex={999}>FLEX & USDT rewards</Typography>
                            </Grid>
                            <Grid container height="100%" width="100%" position="absolute">
                                <DotPattern />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* Daily Payouts */}
            <Grid container mb={15} width="100%" display="flex" justifyContent="center" pt={15} zIndex={998}>
                <Grid container sx={{ width: { lg: '75%', md: '100%', sm: '100%', xs: '100%' } }} display="flex" justifyContent="center">
                    {/* Left Part */}
                    <Grid size={{ lg: 6, md: 6.5, sm: 12, xs: 12 }} direction="column">
                        <Typography color={grey[50]} fontWeight={550} fontSize={35}>
                            Daily payouts with Flex.
                        </Typography>
                        <Typography color={grey[300]} fontWeight={550} fontSize={20} mt={1} pr={2}>
                            Mint Flex by participating in Daily Auctions and receive daily payouts.
                        </Typography>
                        <Grid container gap={2}>
                            <Button
                                endIcon={<EastIcon />}
                                href="https://app.flexdefi.io"
                                target="_blank"
                                sx={{
                                    pl: 2,
                                    pr: 3,
                                    mt: 3,
                                    height: 40,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: grey[50],
                                    borderRadius: 50,
                                    background: blue[400],
                                    textTransform: 'none',
                                    flexGrow: { lg: 'unset', md: 'unset', sm: 1, xs: 1 }
                                }}
                            >
                                Start Minting
                            </Button>
                            <Button
                                endIcon={<EastIcon />}
                                href="https://flexdefi.io/docs"
                                target="_blank"
                                sx={{
                                    pl: 2,
                                    pr: 3,
                                    mt: 3,
                                    border: 1,
                                    height: 40,
                                    fontSize: 16,
                                    fontWeight: 550,
                                    color: grey[50],
                                    borderRadius: 50,
                                    textTransform: 'none',
                                    borderColor: grey[400],
                                    flexGrow: { lg: 'unset', md: 'unset', sm: 1, xs: 1 }
                                }}
                            >
                                Read Docs
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Right Part */}
                    <Grid
                        display="flex"
                        size={{ lg: 5, xs: 12, sm: 12, md: 5 }}
                        sx={{ mt: { lg: -5, md: -5, sm: 3, xs: 3 }, justifyContent: { lg: 'center', md: 'left', sm: 'center', xs: 'center' }, ml: { lg: 0, md: 0, sm: -33, xs: -35 } }}
                    >
                        <Main />
                    </Grid>
                </Grid>
                {/* Quotes */}
                <Grid container sx={{ width: { lg: '75%', md: '100%', sm: '100%', xs: '100%' }, mt: 5 }}>
                    <Box
                        sx={{
                            p: 4,
                            mt: 10,
                            width: { lg: '70%', md: '100%', sm: '100%', xs: '100%' },
                            borderRadius: 3,
                            background: cardColor,
                        }}
                    >
                        <Typography color={grey[300]}>
                            “FLEX is an ecosystem designed for expansion. Every product built on top of it
                            generates revenue that rewards long-term stakers and committed participants.”
                        </Typography>
                        <Grid container display="flex" alignItems="center" gap={1} mt={3}>
                            <Image src="/assets/flexsquarelogo.png" alt="logo" height={25} width={25} />
                            <Typography color={grey[50]} mt={0.5} mb={0.5} fontWeight={900}>
                                FLEX Founder
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* Products */}
            <Grid container width="100%" display="flex" justifyContent="center" borderTop={1} mb={15} borderColor={borderColor}>
                <Products />
            </Grid>
            {/* Meet Flex */}
            <Grid container width="100%" display="flex" justifyContent="center" borderTop={1} borderColor={borderColor}>
                <MeetFlex />
            </Grid>
            {/* WhyFlex */}
            <Grid container width="100%" justifyContent="center" borderTop={1} mb={15} borderColor={borderColor}>
                <WhyFlex />
            </Grid>
            {/* Socials */}
            <Grid container width="100%" justifyContent="center" borderTop={1} mb={15} borderColor={borderColor}>
                <Socials />
            </Grid>
            {/* FAQs */}
            <Grid container width="100%" justifyContent="center" borderTop={1} pt={15} mb={20} borderColor={borderColor}>
                <FAQSection />
            </Grid>
        </>
    );
};

export default Home;
