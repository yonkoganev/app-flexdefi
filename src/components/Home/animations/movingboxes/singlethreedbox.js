import { Box } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

export default function SingleThreeDBox() {
  return (
    <>
    <Box
      sx={{
        ml: 50,
        width: 160,
        height: 160,
        zIndex: 991,
        bottom: -60,
        position: "relative",
        perspective: "1500px",
        transform: 'translateX(-200px)'
      }}
    >
      {/* TOP Layer */}
      <Box
        sx={{
          bottom: 30,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 991,
          borderRadius: "28px",
          background: blue[400],
          transform: "rotateX(60deg) rotate(45deg)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* MID Layer */}
      <Box
        sx={{
          height: 30,
          bottom: 80,
          zIndex: 990,
          left: '-13.5%',
          width: "127%",
          position: "absolute",
          background: blue[100],
          transformStyle: "preserve-3d",
        }}
      />
      {/* BOTTOM Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 990,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: blue[100],
          transform: "rotateX(60deg) rotate(45deg)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Bottom Left Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 990,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateX(60deg) rotate(45deg) translateX(200px)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Top Left Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 990,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateX(60deg) rotate(45deg) translateX(-200px)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Top Right Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 990,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateX(60deg) rotate(45deg) translateY(-200px)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Bottom Left Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 990,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateX(60deg) rotate(45deg) translateY(200px)",
          transformStyle: "preserve-3d",
        }}
      />
    </Box>
    </>
  );
}
