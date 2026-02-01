import Image from "next/image";
import { formatEther } from "viem";
import { cyan, grey } from "@mui/material/colors";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetBalanceOfUSDT } from "../web3/hooks/useGetBalanceOfUSDT";
import { useGetBalanceOfFLEX } from "../web3/hooks/useGetBalanceOfFLEX";
import { useGetBalanceOfBFLEX } from "../web3/hooks/useGetBalanceOfBFLEX";
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";
import { flexContracts } from "../web3/contracts";

const MyStats = () => {
    const { data: bflexBalance } = useGetBalanceOfBFLEX();
    const { data: usdtBalance } = useGetBalanceOfUSDT();
    const { data: flexBalance } = useGetBalanceOfFLEX();
    return(
        <Grid container
            sx={{
                py: 2,
                px: 3,
                border: 1,
                width: '100%',
                borderRadius: 1,
                background: cardColor,
                borderColor: borderColor
            }}
        >
            <Typography color={grey[50]} fontWeight={900} fontSize={24}>
                My stats
            </Typography>
            <Box
                sx={{
                    py: { xs: 0, sm: 2, md: 2, lg: 2 },
                    px: { xs: 0, sm: 3, md: 3, lg: 3 },
                    mt: { xs: 0, sm: 2, md: 2, lg: 2 },
                    border: { xs: 0, sm: 1, md: 1, lg: 1 },
                    width: '100%',
                    borderRadius: 1,
                    background: cardColor,
                    borderColor: { lg: borderColor, md: borderColor, sm: borderColor }
                }}
            >
                <Typography color={grey[50]} fontWeight={600} fontSize={20} sx={{ mt: { lg: 0, md: 0, sm: 0, xs: 3 }, mb: { lg: 0, md: 0, sm: 0, xs: 1 } }}>
                    Balances
                </Typography>
                <Box
                    sx={{
                        my: { xs: 0, sm: 2, md: 2, lg: 2 },
                        borderRadius: 3,
                        background: lightCardColor
                    }}
                >
                    <Grid
                        container
                        display="flex"
                        p={2}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            gap: { xs: 3, sm: 3, md: 0, lg: 0 },
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
                            alignItems: { xs: 'start', sm: 'start', md: 'center', lg: 'center' },
                            justifyContent: { xs: 'left', sm: 'left', md: 'space-between', lg: 'space-between' }
                        }}
                    >
                        {/* FLEX balance */}
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[400],
                                    justifyContent: 'center'
                                }}
                            >
                                <Image src="/assets/flexsquarelogo.png" alt="logo" width={40} height={40} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {flexBalance ? Number(formatEther(flexBalance)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : 0}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    FLEX Balance
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* bFLEX balance */}
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[400],
                                    justifyContent: 'center'
                                }}
                            >
                                <Image src="/assets/flexsquarelogo.png" alt="logo" width={40} height={40} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {bflexBalance ? bflexBalance : 0}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    bFLEX Balance
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* USDT */}
                        <Grid container display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    background: cyan[800],
                                    justifyContent: 'center'
                                }}
                            >
                                <Image src="/assets/usdtlogo.png" alt="logo" width={40} height={40} />
                            </Box>
                            <Grid container display="flex" alignItems="start" flexDirection="column" ml={1.5}>
                                <Typography color={grey[50]} fontSize={18} fontWeight={900}>
                                    {usdtBalance ? Number(formatEther(usdtBalance)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : 0}
                                </Typography>
                                <Typography color={grey[500]} fontSize={16} mt={-0.5}>
                                    USDT Balance
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* CTA */}
                        <Grid container sx={{ width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' } }}>
                            <Button
                                href={`https://pancakeswap.finance/swap?inputCurrency=${flexContracts.FLEX}&outputCurrency=0x55d398326f99059fF775485246999027B3197955`}
                                target="_blank"
                                sx={{
                                    px: 2,
                                    height: 35,
                                    fontWeight: 600,
                                    borderRadius: 1,
                                    color: grey[900],
                                    background: grey[50],
                                    textTransform: 'none',
                                    width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' }
                                }}
                            >
                                Swap
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
};

export default MyStats;
