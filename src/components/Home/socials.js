import XIcon from '@mui/icons-material/X';
import { FaMedium } from "react-icons/fa6";
import { SiGitbook } from "react-icons/si";
import { blue, grey } from "@mui/material/colors";
import { lightCardColor } from '@/constants/colors';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { darken, Grid, IconButton, Typography } from "@mui/material";

const Socials = () => {
    return(
        <Grid container
            pt={15}
            zIndex={998}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ width: { lg: '70%' }, alignItems: { lg: 'center', md: 'center', sm: 'left', xs: 'left' } }}
        >
            <Typography color={grey[50]} fontWeight={600} fontSize={35}>Join the community.</Typography>
            <Typography color={grey[300]} fontSize={20} mt={2}>Stay updated and be part of our <span style={{ fontWeight: 900, color: blue[100] }}>growing</span> community.</Typography>
            <Grid container width="100%" gap={2} justifyContent="center" display="flex" mt={3}>
                <IconButton href="https://x.com/flexbsc" target='_blank' sx={{ background: lightCardColor, borderRadius: 1, height: 50, width: 50, ":hover": { background: darken(lightCardColor, 0.3) } }}>
                    <XIcon style={{ color: grey[50] }} />
                </IconButton>
                <IconButton href="https://medium.com/@flexdefi" target='_blank' sx={{ background: lightCardColor, borderRadius: 1, height: 50, width: 50, ":hover": { background: darken(lightCardColor, 0.3) } }}>
                    <FaMedium style={{ color: grey[50] }} />
                </IconButton>
                <IconButton onClick={() => window.location.href = "mailto:info@flexdefi.io"} sx={{ background: lightCardColor, borderRadius: 1, height: 50, width: 50, ":hover": { background: darken(lightCardColor, 0.3) } }}>
                    <EmailRoundedIcon style={{ color: grey[50] }} />
                </IconButton>
                <IconButton href="https://t.me/flexbsc" target='_blank' sx={{ background: lightCardColor, borderRadius: 1, height: 50, width: 50, ":hover": { background: darken(lightCardColor, 0.3) } }}>
                    <TelegramIcon style={{ color: grey[50] }} />
                </IconButton>
                <IconButton href="https://flexdefi.gitbook.io/flex" target='_blank' sx={{ background: lightCardColor, borderRadius: 1, height: 50, width: 50, ":hover": { background: darken(lightCardColor, 0.3) } }}>
                    <SiGitbook style={{ color: grey[50] }} />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default Socials;
