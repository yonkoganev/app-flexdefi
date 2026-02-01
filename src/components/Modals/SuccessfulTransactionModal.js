// material-ui
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

// ==============================|| TransactionModal ||============================== //

const SuccessfullTransactionModal = ({ open, setOpen }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%', fontSize: 16 }}>
                Transaction successful!
            </Alert>
        </Snackbar>
    );
};

// Define prop types for TransactionModal
SuccessfullTransactionModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default SuccessfullTransactionModal;
