import { Grid } from "@mui/material";
import Dash from "@/components/Dashboard";

export default function Index() {
  return (
    <>
      <Grid container display="flex" justifyContent="center" width="100%">
          <Dash />
      </Grid>
    </>
  );
}
