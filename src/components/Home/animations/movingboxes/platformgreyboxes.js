import { cardColor } from "@/constants/colors";
import { Box } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

export default function PlatformGreyBoxes() {
  return (
    <>
      {/* Mid Layer */}
      <Box
        sx={{
          bottom: 3,
          zIndex: 90,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: cardColor,
          transform: "rotateX(60deg) rotate(45deg)",
        }}
      />
      {/* Bottom Left Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 90,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: cardColor,
          transform: "rotateX(60deg) rotate(45deg) translateX(200px)",
        }}
      />
      {/* Top Left Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 90,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: cardColor,
          transform: "rotateX(60deg) rotate(45deg) translateX(-200px)",
        }}
      />
      {/* Top Right Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 90,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: cardColor,
          transform: "rotateX(60deg) rotate(45deg) translateY(-200px)",
        }}
      />
      {/* Bottom Left Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 90,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: cardColor,
          transform: "rotateX(60deg) rotate(45deg) translateY(200px)",
        }}
      />
    </>
  );
}
