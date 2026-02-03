import { useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import StakeActionModal from "./StakeActionModal";
import { green, grey, red } from "@mui/material/colors";
import { useStakeRewards } from "../web3/hooks/useStakeReward";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useGetCurrentDay } from "../web3/hooks/useGetCurrentDay";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Avatar, Box, Button, Grid, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { day_length, launchTimestamp } from "@/constants/TimestampLaunch";
import { borderColor, cardColor, lightCardColor } from "@/constants/colors";

const StakesList = ({ stakes, onChange }) => {
    // web3
    const { address } = useAccount();
    const { data: currentDay } = useGetCurrentDay();

    const stakeIDs = stakes?.[0] ?? [];
    const stakeData = stakes?.[1] ?? [];

    const { data: rewardResults } = useStakeRewards(stakeIDs, address);

    const merged = stakeData.map((stake, idx) => ({
        id: stakeIDs[idx],
        ...stake,
        reward: rewardResults?.[idx]?.result?.[1] ?? 0n,
        usdtReward: rewardResults?.[idx]?.result?.[2] ?? 0n
    }));

    /* ------------------- SPLIT ACTIVE / CLOSED ------------------- */

    const activeStakes = merged.filter(s => s.isActive === 1);
    const closedStakes = merged
        .filter(s => s.isActive === 0)
        .sort((a, b) => (b.closeDay ?? 0) - (a.closeDay ?? 0));

    /* ------------------- UI STATE ------------------- */

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedStake, setSelectedStake] = useState(null);
    const [action, setAction] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const openMenu = Boolean(menuAnchor);

    const handleOpenMenu = (event, stake) => {
        setMenuAnchor(event.currentTarget); // 👈 THIS is the anchor
        setSelectedStake(stake);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };

    const refetch = () => {
        onChange?.();
    }

    const cellStyle = { maxWidth: 180, minWidth: 140, color: grey[300], overflow: 'hidden', textOverflow: 'ellipsis', borderColor: borderColor };

    /* ------------------- HELPERS ------------------- */

    const formatAmount = (amount) => {
        const v = Number(formatEther(amount));
        if (v >= 1_000_000) return `${(v / 1e6).toFixed(2)}M`;
        if (v >= 1_000) return `${(v / 1e3).toFixed(2)}K`;
        return v.toFixed(2);
    };

    const dayToTime = (day) => {
        const SECONDS_IN_DAY = day_length;
        const LAUNCH = launchTimestamp / 1000;
        const ts = LAUNCH + day * SECONDS_IN_DAY;
        const d = new Date(ts * 1000);
        const dayNum = d.getDate();
        const suffix =
        dayNum % 10 === 1 && dayNum !== 11 ? "st" :
        dayNum % 10 === 2 && dayNum !== 12 ? "nd" :
        dayNum % 10 === 3 && dayNum !== 13 ? "rd" : "th";
        return `${d.toLocaleString("en-US", { month: "short" })} ${dayNum}${suffix}, ${d.getFullYear()}`;
    };

    /* ------------------- TABLE ------------------- */

    const renderTable = (data, showActions) => (
        <TableContainer component={Paper} sx={{ background: "transparent", boxShadow: 0 }}>
        <Table stickyHeader>
            <TableHead>
            <TableRow>
                {["Name", "Amount", "Shares", "Start", "End", "FLEX Rewards", "USDT Rewards", showActions && "Irrevocable", showActions && "bFLEX", showActions && " "]
                .filter(Boolean)
                .map((h, i) => (
                    <TableCell key={i} sx={{ color: "#fff", fontWeight: 700, background: cardColor, borderColor: borderColor }}>
                        {h}
                    </TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {data.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: "center", color: grey[50], py: 3, borderColor: 'transparent' }}>
                        No stakes found.
                    </TableCell>
                </TableRow>
            ) : (
                data.map((stake) => (
                <TableRow key={stake.id}>
                    <TableCell sx={{...cellStyle}} title={stake.description}>{stake.description}</TableCell>
                    <TableCell sx={{...cellStyle}}>
                        <Grid container gap={1}>
                            {formatAmount(stake.stakedAmount)}
                            <Avatar src="/assets/flexsquarelogo.png" sx={{ width: 18, height: 18 }} />
                        </Grid>
                    </TableCell>
                    <TableCell sx={{...cellStyle}}>{formatAmount(stake.stakesShares)}</TableCell>
                    <TableCell sx={{...cellStyle}}>{dayToTime(stake.startDay)} (Day: {stake.startDay})</TableCell>
                    <TableCell sx={{...cellStyle}}>{dayToTime(stake.finalDay)} (Day: {stake.finalDay})</TableCell>
                    <TableCell sx={{...cellStyle, minWidth: 150, fontWeight: 900}}>
                        <Grid container gap={1}>
                            {formatAmount(stake.reward)}
                            <Avatar src="/assets/flexsquarelogo.png" sx={{ width: 18, height: 18 }} />
                        </Grid>
                    </TableCell>
                    <TableCell sx={{...cellStyle, minWidth: 150, fontWeight: 900}}>
                        <Grid container gap={1}>
                            {formatAmount(stake.usdtReward)}
                            <Avatar src="/assets/usdtlogo.png" sx={{ width: 18, height: 18 }} />
                        </Grid>
                    </TableCell>
                    {showActions && (
                        <TableCell sx={{...cellStyle, minWidth: 20, textAlign: 'center'}}>
                            {stake.isIrrBFLEX === 3  || stake.isIrrBFLEX === 1 ? (
                                <CheckCircleRoundedIcon sx={{ color: green[400] }} />
                            ) : (
                                <CancelRoundedIcon sx={{ color: red[400] }} />
                            )}
                        </TableCell>
                    )}
                    {showActions && (
                        <TableCell sx={{...cellStyle, minWidth: 20, textAlign: 'center'}}>
                            {stake.isIrrBFLEX === 2  || stake.isIrrBFLEX === 3 ? (
                                <CheckCircleRoundedIcon sx={{ color: green[400] }} />
                            ) : (
                                <CancelRoundedIcon sx={{ color: red[400] }} />
                            )}
                        </TableCell>
                    )}
                    {showActions && (
                        <TableCell sx={{...cellStyle}}>
                            <Button
                                onClick={(e) =>
                                    handleOpenMenu(e, {
                                        id: stake.id,
                                        description: stake.description,
                                        stakedAmount: stake.stakedAmount,
                                        startDay: stake.startDay,
                                        endDay: stake.finalDay,
                                        shares: stake.stakesShares,
                                        rewards: stake.reward,
                                        usdtrewards: stake.usdtReward,
                                        isActive: stake.isActive,
                                        irrevocable: stake.isIrrBFLEX === 1 || stake.isIrrBFLEX === 3,
                                        isIrrBFLEX: stake.isIrrBFLEX
                                    })
                                }
                            >
                                <MoreHorizRoundedIcon style={{ color: grey[50] }} />
                            </Button>
                        </TableCell>
                    )}
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
        </TableContainer>
    );
  /* ------------------- RENDER ------------------- */
    return (
        <>
            <Grid size={{ lg: 8.15, md: 11.9, sm: 12, xs: 12 }} sx={{ p: 2, border: 1, background: cardColor, borderColor: borderColor, borderRadius: 1 }}>
                <Box sx={{ border: 1, width: '100%', display: 'flex', borderRadius: 1, borderColor: borderColor, justifyContent: 'center', flexDirection: 'column' }} >
                    <Typography color={grey[50]} fontSize={22} fontWeight={600} mb={1} p={2}>
                        Active Stakes
                    </Typography>
                    {renderTable(activeStakes, true)}
                </Box>
            </Grid>               
            <Grid size={{ lg: 8.15, md: 12, sm: 12, xs: 12 }} sx={{ p: 2, border: 1, background: cardColor, borderColor: borderColor, borderRadius: 1 }}>
                <Box sx={{ border: 1, width: '100%', display: 'flex', borderRadius: 1, borderColor: borderColor, justifyContent: 'center', flexDirection: 'column' }} >
                    <Typography color={grey[50]} fontSize={22} fontWeight={600} mb={1} p={2}>
                        Closed Stakes
                    </Typography>
                    {renderTable(closedStakes, false)}
                </Box>
            </Grid>
            {/* ACTION MENU */}
            <Menu
                anchorEl={menuAnchor}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                PaperProps={{
                    sx: {
                        background: cardColor,
                        border: borderColor,
                        borderRadius: 1,
                        minWidth: 160
                        }
                    }}
            >
                <MenuItem
                    disabled={currentDay && selectedStake?.endDay < currentDay}
                    onClick={() => {
                        setAction(0);
                        setOpenModal(true);
                        handleCloseMenu();
                    }}
                    sx={{ color: grey[50], ":hover": { background: lightCardColor } }}
                >
                    Rename
                </MenuItem>
                <MenuItem
                    disabled={currentDay && selectedStake?.endDay < currentDay}
                    onClick={() => {
                        setAction(1);
                        setOpenModal(true);
                        handleCloseMenu();
                    }}
                    sx={{ color: grey[50], ":hover": { background: lightCardColor } }}
                >
                    Transfer
                </MenuItem>
                <MenuItem
                    disabled={selectedStake?.isIrrBFLEX === 1 || selectedStake?.isIrrBFLEX === 3 || selectedStake?.endDay < currentDay}
                    onClick={() => {
                        setAction(2);
                        setOpenModal(true);
                        handleCloseMenu();
                    }}
                    sx={{ color: grey[50], ":hover": { background: borderColor } }}
                >
                    Claim rewards
                </MenuItem>
                <MenuItem
                    disabled={selectedStake?.isIrrBFLEX === 1 || selectedStake?.isIrrBFLEX === 3 || selectedStake?.isActive !== 1}
                    onClick={() => {
                        setAction(3);
                        setOpenModal(true);
                        handleCloseMenu();
                    }}
                    sx={{ color: grey[50], ":hover": { background: borderColor } }}
                >
                    End stake
                </MenuItem>
            </Menu>
            <StakeActionModal open={openModal} setOpen={setOpenModal} action={action} stake={selectedStake} onChange={refetch} currentDay={currentDay} />
        </>
    );
};

export default StakesList;
