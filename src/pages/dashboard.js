import Dash from "@/components/Dashboard";
import { Grid } from "@mui/material";

const Dashboard = () => {
    return (
        <Grid container display="flex" justifyContent="center" width="100%">
            <Dash />
        </Grid>
    );
};

export default Dashboard;
