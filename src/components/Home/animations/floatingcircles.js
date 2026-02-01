import { Box, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";

const FloatingCircles = () => {
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      position="absolute"
      justifyContent="center"
      sx={{
        top: 40,
        right: 70,
        "@keyframes floatX": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(25px)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    > 
      {/* Circle 1 */}
      <Box
        sx={{
          right: 50,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: `linear-gradient(0deg, ${blue[400]} 50%, ${blue[100]} 50%)`,
          position: "absolute",
          animation: "floatX 6s ease-in-out infinite",
          animationDelay: "0s",
        }}
      />

      {/* Circle 2 */}
      <Box
        sx={{
          right: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `linear-gradient(0deg, ${blue[200]} 50%, ${blue[500]} 50%)`,
          position: "absolute",
          animation: "floatX 6s ease-in-out infinite",
          animationDelay: "0.8s", // ⏱ starts a bit later
        }}
      />

      {/* Circle 3 */}
      <Box
        sx={{
          right: -150,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `linear-gradient(0deg, ${blue[400]} 50%, ${blue[100]} 50%)`,
          position: "absolute",
          animation: "floatX 6s ease-in-out infinite",
          animationDelay: "1.3s", // ⏱ starts even later
        }}
      />
    </Grid>
  );
};

export default FloatingCircles;
