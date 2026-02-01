import { Box, Grid } from "@mui/material";

export default function RotatingRing() {
  const rings = [1, 2, 3, 4];
  const startAngles = [0, 90, 140, 270]; // clean offsets

  return (
    <Grid container sx={{ position: 'absolute', top: 850, overflow: 'hidden' }}>
    <Box
      sx={{
        top: "50%",
        left: "50%",
        width: "95vmin",
        height: "95vmin",
        overflow: 'hidden',
        borderRadius: "50%",
        position: "relative",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)"
      }}
    >
      {rings.map((i, idx) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            inset: 0,
            transform: `scale(${0.55 + i * 0.2})`,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden",

            // rotating gradient arc
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              // nicer gradient spread
              background: `conic-gradient(
                from ${startAngles[idx]}deg,
                transparent 0deg,
                transparent 250deg,
                rgba(41,121,255,0.85) 270deg,
                rgba(41,121,255,0.4) 310deg,
                transparent 360deg
              )`,
              mask: "radial-gradient(closest-side, transparent 99.7%, black 96%)",
              WebkitMask:
                "radial-gradient(closest-side, transparent 99.7%, black 96%)",
              animation: `spin ${10 + i * 3}s linear infinite`,
              filter: "drop-shadow(0 0 6px rgba(41,121,255,0.25))",
            },
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
    </Grid>
  );
}
