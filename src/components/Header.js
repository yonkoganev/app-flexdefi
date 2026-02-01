import Image from "next/image";
import { useRouter } from "next/router";
import { FaCoins } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { blue, grey } from "@mui/material/colors";
import { MdOutlineSsidChart } from "react-icons/md";
import WalletConnectButton from "./WalletConnectButton";
import { lighten, useTheme } from "@mui/material/styles";
import { Button, Grid, useMediaQuery } from "@mui/material";
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { borderColor, cardColor } from "@/constants/colors";

const Header = () => {
    const theme = useTheme();
    const router = useRouter();
    const currentPath = router.pathname;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const buttons = [
        { text: "Dashboard", path: "/dashboard", icon: <MdDashboard style={{ color: grey[50] }} /> },
        { text: "Auction", path: "/auction", icon: <RiAuctionFill style={{ color: grey[50] }} /> },
        { text: "Stake", path: "/stake", icon: <FaCoins style={{ color: grey[50] }} /> },
        { text: "Predictions", path: "/predictions", icon: <MdOutlineSsidChart style={{ color: grey[50] }} /> }
    ];

    return (
        <>
            <Grid
                container
                px={3}
                py={0}
                top={0}
                width="100%"
                display="flex"
                position="absolute"
                alignItems="center"
                justifyContent="space-between"
                sx={{ borderBottom: 1, borderColor: borderColor }}
            >
                <Image src="/assets/flextransparentlogo.png" alt="logo" height={45} width={45} style={{ filter: 'grayscale(100%)' }} />
                <Grid container display="flex" gap={1} alignItems="center" zIndex={999}>
                    <Button
                        href="https://pancakeswap.finance"
                        target="_blank"
                        endIcon={<SwapHorizRoundedIcon style={{ width: 25, height: 25 }} />}
                        sx={{
                            px: 1.5,
                            border: 1,
                            height: 37,
                            fontSize: 14,
                            minWidth: 35,
                            fontWeight: 550,
                            color: grey[50],
                            borderRadius: 1,
                            textTransform: 'none',
                            background: cardColor,
                            borderColor: borderColor,
                            width: isMobile ? 37 : 'auto',
                            ':hover': { background: lighten(cardColor, 0.1) },
                            '& .MuiButton-endIcon': {
                                marginLeft: isMobile ? -0.2 : 0.8
                            }
                        }}
                    >
                        {isMobile ? '' : 'Swap'}
                    </Button>
                    <WalletConnectButton fullwidth={false} />
                </Grid>
            </Grid>
            {isMobile ? (
                <Grid container width="100%" justifyContent="center" display="flex">
                    <Grid
                        container
                        width="90%"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            height: 50,
                            mt: 0.75,
                            border: 1,
                            zIndex: 999,
                            bottom: 20,
                            borderRadius: 50,
                            position: 'fixed',
                            borderColor: grey[900],
                            backdropFilter: 'blur(12px)',
                            px: { sm: 1, xs: 1, md: 6, lg: 6 },
                            background: 'rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        {buttons.map((button, id) => {
                            const isActive = currentPath === button.path;
                            return (
                                <Button
                                    key={id}
                                    disableRipple
                                    onClick={() => router.push(button.path)}
                                    sx={{
                                        fontSize: 15,
                                        textTransform: 'none',
                                        background: 'transparent',
                                        fontWeight: isActive ? 600 : 0,
                                        color: isActive ? grey[50] : grey[200]
                                    }}
                                >
                                    {button.text}
                                </Button>
                            );
                        })}
                    </Grid>
                </Grid>
            ) : (
                /* Desktop Version */
                <Grid
                    container
                    width="100%"
                    alignItems="center"
                    sx={{
                        mt: 0.7,
                        gap: 2,
                        position: 'absolute',
                        pl: { lg: 15, md: 10, sm: 10 },
                    }}
                >
                    {buttons.map((button, id) => {
                        const isActive = currentPath === button.path;
                        return (
                            <Button
                                key={id}
                                disableRipple
                                onClick={() => router.push(button.path)}
                                sx={{
                                    fontSize: 14,
                                    textTransform: 'none',
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                    background: 'transparent',
                                    fontWeight: isActive ? 600 : 0,
                                    borderBottom: isActive ? 3 : 0,
                                    color: isActive ? grey[50] : grey[200],
                                    borderColor: isActive ? blue[400] : 'transparent',
                                    ':hover': { background: cardColor, borderBottom: 2, borderColor: blue[400] }
                                }}
                            >
                                {button.text}
                            </Button>
                        );
                    })}
                </Grid>
            )}
        </>
    );
};

export default Header;
