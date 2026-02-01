import { borderColor, cardColor } from "@/constants/colors";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const MissingWalletBox = () => {
    return(
        <Box
            sx={{
                border: 1,
                width: '100%',
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                background: cardColor,
                borderColor: borderColor,
                justifyContent: 'center',
                py: { lg: 10, md: 8, sm: 5, xs: 3 },
            }}
        >
            <Typography color={grey[50]} fontWeight={600}>
                Please connect your wallet.
            </Typography>
        </Box>
    );
};

export default MissingWalletBox;
