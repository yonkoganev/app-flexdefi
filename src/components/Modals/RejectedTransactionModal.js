// material-ui
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

// ==============================|| TransactionModal ||============================== //

const RejectedTransactionModal = ({ open, setOpen }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%', fontSize: 16 }}>
                Transaction rejected!
            </Alert>
        </Snackbar>
    );
};

RejectedTransactionModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default RejectedTransactionModal;
