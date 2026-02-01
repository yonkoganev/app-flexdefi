import { blue, grey } from "@mui/material/colors";
import { Box, Button, Modal, Typography } from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const style = {
    p: 4,
    top: '50%',
    left: '50%',
    minWidth: 350,
    maxWidth: 450,
    borderRadius: 3,
    bgcolor: grey[900],
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
};

const CustomModal = ({ open, setOpen, title, text }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <InfoRoundedIcon style={{ fontSize: 50, color: blue[400] }} />
                <Typography color={grey[50]} fontSize={26} fontWeight={800}>
                    {title}
                </Typography>
                <Typography textAlign="center" color={grey[400]} sx={{ mt: 1 }}>
                    {text}
                </Typography>
                <Button
                    onClick={() => setOpen(false)}
                    fullWidth
                    sx={{
                        mt: 2,
                        py: 1,
                        fontSize: 18,
                        borderRadius: 3,
                        color: grey[50],
                        fontWeight: 'bold',
                        textTransform: 'none',
                        background: `linear-gradient(to right, ${blue[400]}, ${blue[900]})`
                    }}
                >
                    Okay
                </Button>
            </Box>
        </Modal>
    );
};

export default CustomModal;
