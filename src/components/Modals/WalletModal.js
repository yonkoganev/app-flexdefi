import { useState } from 'react';
import PropTypes from 'prop-types';
import { blue, grey, orange } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { Typography, Modal, Box, Grid, IconButton, Avatar, Button } from '@mui/material';
import { cardColor } from '@/constants/colors';

const WalletModal = ({ open, setOpen }) => {
    const { disconnect } = useDisconnect();
    const handleClose = () => setOpen(false);
    const { address, isConnected } = useAccount();
    const [isActive, setIsActive] = useState(false);
    const { data } = useBalance({ address });

    const handleClick = () => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false);
        }, 2000); // 2 seconds
    };
    const handleCopy = () => {
        navigator.clipboard
            .writeText(address)
            .then(() => {
                console.log('Text successfully copied to clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    borderRadius: 3,
                    transform: 'translate(-50%, -50%)',
                    bgcolor: cardColor,
                    width: { xs: '90%', sm: '70%', md: 400, lg: 400 }
                }}
            >
                <Grid container sx={{ position: 'absolute', justifyContent: 'right', right: 20, left: 'auto', mt: 2 }}>
                    <IconButton
                        size="small"
                        sx={{ background: grey[700] }}
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <CloseIcon sx={{ color: grey[50], fontSize: 15 }} />
                    </IconButton>
                </Grid>
                <Grid container sx={{ dispaly: 'flex', mt: 3, alignItems: 'center', flexDirection: 'column' }}>
                    <Avatar src="/assets/walletaccicon.png" alt="logo" sx={{ width: 80, height: 80 }} />
                    <Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 800, mt: 2, color: grey[50] }}>
                        {address ? shortAddress : null}
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: grey[400] }}>
                        {(Number(data?.value) / 1e18).toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 4 })} <span style={{ color: orange[500] }}>BNB</span>
                    </Typography>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 4, px: 2, gap: 2 }}>
                    <Button
                        disabled={isActive}
                        onClick={() => {
                            handleCopy();
                            handleClick();
                        }}
                        sx={{
                            flexGrow: 1,
                            color: grey[900],
                            borderRadius: 1,
                            textTransform: 'none',
                            background: grey[50],
                            ':disabled': { background: grey[800], color: grey[400] }
                        }}
                        startIcon={isConnected ? <DoneRoundedIcon /> : <ContentCopyRoundedIcon />}
                    >
                        {isActive ? 'Copied' : 'Copy Address'}
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            disconnect();
                        }}
                        sx={{ flexGrow: 1, textTransform: 'none', background: grey[50], color: grey[900], borderRadius: 1 }}
                        startIcon={<LogoutRoundedIcon />}
                    >
                        Disconnect
                    </Button>
                </Grid>
            </Box>
        </Modal>
    );
};

// Define prop types for WalletModal
WalletModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default WalletModal;
