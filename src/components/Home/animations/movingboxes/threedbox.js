import { Box } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

export default function ThreeDBox() {
  return (
    <>
    <Box
      sx={{
        ml: 20,
        width: 160,
        height: 160,
        zIndex: 999,
        position: "relative",
        perspective: "1900px"
      }}
    >
      <Box
        sx={{
          zIndex: 998,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: blue[200],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg)",
          transformStyle: "preserve-3d",
        }}
      />
      <Box
        sx={{
          left: -22,
          zIndex: 998,
          position: "absolute",
          width: 202.75,
          height: 30,
          bottom: 78,
          background: blue[200],
        }}
      />
      <Box
        sx={{
          zIndex: 997,
          bottom: -30,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: blue[100],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg)",
          transformStyle: "preserve-3d",
        }}
      />
      <Box
        sx={{
          left: -22,
          zIndex: 997,
          position: "absolute",
          width: 202.75,
          height: 30,
          bottom: 48,
          background: blue[100],
        }}
      />
      <Box
        sx={{
          bottom: 30,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 999,
          borderRadius: "28px",
          background: blue[400],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg)",
          transformStyle: "preserve-3d",
        }}
      />
      <Box
        sx={{
          zIndex: 980,
          bottom: -60,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg)",
          transformStyle: "preserve-3d",
        }}
      />
      <Box
        sx={{
          zIndex: 980,
          bottom: -60,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg) translateX(200px)"
        }}
      />
      <Box
        sx={{
          zIndex: 980,
          bottom: -60,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg) translateX(-200px)"
        }}
      />
      <Box
        sx={{
          zIndex: 980,
          bottom: -60,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg) translateY(-200px)"
        }}
      />
      <Box
        sx={{
          zIndex: 980,
          bottom: -60,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: grey[100],
          transform: "rotateZ(-31deg) rotateY(40deg) rotateX(45deg) translateY(200px)"
        }}
      />
    </Box>
    </>
  );
}
