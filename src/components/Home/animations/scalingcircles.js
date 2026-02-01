import { Box, Grid } from "@mui/material";
import { green } from "@mui/material/colors";

const ScalingCircles = () => {
  return (
    <Grid
      container
      display="flex"
      position="absolute"
      alignItems="center"
      justifyContent="center"
      sx={{
        top: 0,
        right: 100,
        "@keyframes scale": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      }}
    >
      {/* Circle 1 */}
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `linear-gradient(270deg, ${green[700]} 50%, ${green[200]} 50%)`,
          position: "absolute",
          animation: "scale 6s ease-in-out infinite",
          animationDelay: "1s",
          zIndex: 101
        }}
      />

      {/* Circle 2 */}
      <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `linear-gradient(270deg, ${green[400]} 50%, ${green[700]} 50%)`,
          position: "absolute",
          animation: "scale 6s ease-in-out infinite",
          animationDelay: "0.5s", // ⏱ starts a bit later
          zIndex: 100
        }}
      />

      {/* Circle 3 */}
      <Box
        sx={{
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: `linear-gradient(270deg, ${green[700]} 50%, ${green[200]} 50%)`,
          position: "absolute",
          animation: "scale 6s ease-in-out infinite",
          animationDelay: "0s", // ⏱ starts even later
          zIndex: 99
        }}
      />
    </Grid>
  );
};

export default ScalingCircles;
