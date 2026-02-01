import { Fade, Grid, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useState, useEffect } from "react";
import MultipleCircles from "./animations/multiplecircles";

const MeetFlex = () => {
    const [selected, setSelected] = useState(0); // default: Supply selected
    const [showDesc, setShowDesc] = useState(0); // controls which description is visible
    // Handle delayed fade-in after main transition
    useEffect(() => {
        // instantly hide both descriptions first
        setShowDesc(null);

        // after width transition finishes, show the new one
        const timer = setTimeout(() => setShowDesc(selected), 400); // matches "width 0.4s ease"
        return () => clearTimeout(timer);
    }, [selected]);
    return (
        <Grid container
            mb={15}
            pt={15}
            zIndex={998}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ width: { lg: '70%' }, alignItems: { lg: 'center', md: 'center', sm: 'left', xs: 'left' } }}
        >
            <Typography color={grey[50]} fontWeight={600} fontSize={35}>Meet Flex.</Typography>
            <Typography color={grey[300]} fontSize={20} mt={2}>Mint Flex. Receive Daily Payouts. Earn interest 24/7.</Typography>
            <Grid container sx={{ width: '100%' }}>
                <MultipleCircles />
            </Grid>
            <Grid container width="100%" display="flex" justifyContent="space-between" gap={2} px={2}>
                {/* SUPPLY */}
                <Grid
                    container
                    onClick={() => setSelected(0)}
                    sx={{
                        py: 1.5,
                        height: 100,
                        borderTop: 3,
                        ":hover": { cursor: "pointer" },
                        width: selected === 0 ? { lg: "60%", md: '60%', sm: '100%', xs: '100%' } : "35%",
                        borderColor: selected === 0 ? blue[500] : grey[300],
                        transition: "width 0.4s ease, border-color 0.3s ease",
                    }}
                >
                    <Typography fontFamily="Roboto Slab" fontSize={24} fontWeight={600} color={selected === 0 ? blue[500] : grey[300]}>
                        Mint
                    </Typography>
                    <Fade in={showDesc === 0} timeout={{ enter: 500, exit: 0 }} mountOnEnter unmountOnExit>
                        <Grid container width="100%">
                            <Typography fontFamily="Roboto Slab" fontSize={16} color={grey[300]}>
                                Mint Flex by participating in the Daily Auctions.
                            </Typography>
                        </Grid>
                    </Fade>
                </Grid>
                {/* BORROW */}
                <Grid
                    container
                    onClick={() => setSelected(1)}
                    sx={{
                        py: 1.5,
                        height: 100,
                        borderTop: 3,
                        ":hover": { cursor: "pointer" },
                        width: selected === 1 ? { lg: "60%", md: '60%', sm: '100%', xs: '100%' } : "35%",
                        borderColor: selected === 1 ? blue[500] : grey[300],
                        transition: "width 0.4s ease, border-color 0.3s ease",
                    }}
                >
                    <Typography fontFamily="Roboto Slab" fontSize={24} fontWeight={600} color={selected === 1 ? blue[500] : grey[300]}>
                        Earn
                    </Typography>
                    <Fade in={showDesc === 1} timeout={{ enter: 500, exit: 0 }} mountOnEnter unmountOnExit>
                        <Grid container width="100%">
                            <Typography fontFamily="Roboto Slab" fontSize={16} color={grey[300]}>
                                Stake Flex and receive high-yield hybrid-rewards in the form of Flex and USDT.
                            </Typography>
                        </Grid>
                    </Fade>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MeetFlex;
