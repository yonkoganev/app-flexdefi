import { Box } from "@mui/material";

export default function StackedBoxes() {
  return (
    <>
      {/* TOP Layer */}
      <Box
        sx={{
          bottom: 90,
          zIndex: 991,
          width: "100%",
          height: "100%",
          display: 'flex',
          position: "absolute",
          borderRadius: "28px",
          alignItems: 'center',
          justifyContent: 'center',
          transform: "rotateX(60deg) rotate(45deg)",
          animation: 'changingColor 7s ease-in-out infinite'
        }}
      >
        <img src="/assets/flextransparentlogo.png" alt="logo" width="80%" height="80%" style={{ transform: 'rotate(270deg)', marginBottom: '15%' }} />
      </Box>
      {/* MID Layer */}
      <Box
        sx={{
          height: 30,
          bottom: 140,
          zIndex: 990,
          left: '-13.5%',
          width: "127%",
          position: "absolute",
          animation: 'changingColor2 7s ease-in-out infinite'
        }}
      />
      {/* BOTTOM Layer */}
      <Box
        sx={{
          bottom: 60,
          zIndex: 990,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          transform: "rotateX(60deg) rotate(45deg)",
          animation: 'changingColor2 7s ease-in-out infinite'
        }}
      />
      {/* Bottom Box Layer */}
      <Box
        sx={{
          height: 30,
          bottom: 110,
          zIndex: 980,
          left: '-13.5%',
          width: "127%",
          position: "absolute",
          animation: 'changingColor3 7s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          bottom: 30,
          zIndex: 980,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          transform: "rotateX(60deg) rotate(45deg)",
          animation: 'changingColor3 7s ease-in-out infinite'
        }}
      />
    </>
  );
}
