import { Grid } from "@mui/material";
import PredictionsLayout from "@/components/Predictions/PredictionsLayout";

const Predictions = () => {
    return (
        <Grid container sx={{ flexGrow: 1 }}>
            <PredictionsLayout />
        </Grid>
    );
};

export default Predictions;
