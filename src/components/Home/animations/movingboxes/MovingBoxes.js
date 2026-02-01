import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function MovingBoxes() {
  return (
    <>
      <Box
        sx={{
            opacity: 0,
            width: 160,
            height: 160,
            zIndex: 970,
            position: "absolute",
            transform: 'translateX(-252%) translateY(128%)',
            "@keyframes movingDiagonal": {
              //FadeIn
              "0%": { transform: "translateX(-252%) translateY(128%)", opacity: 0 },
              //FirstStop
              "14.28%": { transform: "translateX(-177%) translateY(89%)", opacity: 1 },
              "28.56%": { transform: "translateX(-177%) translateY(89%)", opacity: 1 },
              //MidStop
              "42.84%": { transform: "translateX(-88%) translateY(44%)" },
              "57.12%": { transform: "translateX(-88%) translateY(44%)" },
              //FinalStop
              "71.4%": { transform: "translateX(0%) translateY(0%)" },
              "85.68%": { transform: "translateX(0%) translateY(0%)", opacity: 1 },
              //FadeOut
              "100%": { transform: "translateX(75%) translateY(-40%)", opacity: 0 },
            },
            animation: 'movingDiagonal 7s ease-in-out infinite'
        }}
      >
      {/* TOP Layer */}
      <Box
        sx={{
          bottom: 30,
          zIndex: 975,
          width: "100%",
          height: "100%",
          display: 'flex',
          alignItems: 'center',
          borderRadius: "28px",
          background: grey[800],
          position: "absolute",
          justifyContent: 'center',
          transform: "rotateX(60deg) rotate(45deg) translateY(-200px)"
        }}
      >
        <img src="/assets/flextransparentlogo.png" alt="logo" width="80%" height="80%" style={{ transform: 'rotate(270deg)', marginBottom: '15%' }} />
      </Box>
      {/* MID Layer */}
      <Box
        sx={{
          left: '75%',
          height: 29,
          bottom: 150,
          zIndex: 974,
          width: "127%",
          position: "absolute",
          background: grey[400],
        }}
      />
      {/* BOTTOM Layer */}
      <Box
        sx={{
          bottom: 0,
          zIndex: 974,
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "28px",
          background: grey[400],
          transform: "rotateX(60deg) rotate(45deg) translateY(-200px)"
        }}
      />
      </Box>
    </>
  );
}
