import { Grid } from "@mui/material";
import DailyAuctions from "@/components/Auctions/DailyAuctions";

const Auction = () => {
    return (
        <Grid container sx={{ flexGrow: 1 }}>
            <DailyAuctions />
        </Grid>
    );
};

export default Auction;
