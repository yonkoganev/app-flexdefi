// material-ui
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

// ==============================|| Submitted Transaction Modal ||============================== //

const SubmittedTransactionModal = ({ open, setOpen }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%', fontSize: 16 }}>
                Transaction submitted!
            </Alert>
        </Snackbar>
    );
};

SubmittedTransactionModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default SubmittedTransactionModal;
