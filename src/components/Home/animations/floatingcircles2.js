import { Box, Grid } from "@mui/material";
import { red } from "@mui/material/colors";

const FloatingCircles2 = () => {
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      position="absolute"
      justifyContent="center"
      sx={{
        top: 0,
        right: 70,
        "@keyframes floatX": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(25px)" },
          "100%": { transform: "translateY(0)" },
        },
      }}
    > 
      {/* Circle 1 */}
      <Box
        sx={{
          opacity: 0.8,
          right: -70,
          width: 240,
          height: 240,
          borderRadius: "50%",
          position: "absolute",
          animation: "floatX 6s ease-in-out infinite",
          background: `linear-gradient(270deg, ${red[500]} 50%, ${red[200]} 50%)`,
        }}
      />
      {/* Circle 2 */}
      <Box
        sx={{
          opacity: 0.8,
          right: -190,
          width: 240,
          height: 240,
          borderRadius: "50%",
          position: "absolute",
          animation: "floatX 6s ease-in-out infinite 0.4s",
          background: `linear-gradient(270deg, ${red[200]} 50%, ${red[500]} 50%)`,
        }}
      />
    </Grid>
  );
};

export default FloatingCircles2;
