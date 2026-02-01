import { Box, Grid } from "@mui/material";

const circleData = [
  { colors: ["#a7e8fb", "#39d1f9"], base: "#d8f6ff", height: 110 },
  { colors: ["#ffd401", "#ffb400"], base: "#fff6a4", height: 120 },
  { colors: ["#39beb7", "#01827c"], base: "#83ede7", height: 140 },
  { colors: ["#01aeff", "#018bff"], base: "#96e9ff", height: 160 },
  { colors: ["#ff8130", "#ff3200"], base: "#ffc38b", height: 210 },
  { colors: ["#bcbbff", "#9896ff"], base: "#e2e0ff", height: 270 },
];

export default function MultipleCircles() {
  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 0.5,
          py: 8,
          width: "100%",
        }}
      >
        {circleData.map((item, i) => (
          <Grid
            key={i}
            container
            sx={{
              width: "15%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            {/* Rectangle (base section) */}
            <Box
              sx={{
                mt: 5,
                width: "100%",
                height: { lg: item.height, md: item.height - 60, sm: item.height - 40, xs: item.height - 50 },
                background: item.base
              }}
            />

            {/* Circle (overlapping top half) */}
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(90deg, ${item.colors[0]} 50%, ${item.colors[1]} 50%)`,
                position: "absolute",
                bottom: { lg: item.height - 69, md: item.height - 100, sm: item.height - 80, xs: item.height - 80 }, // ensures overlap from middle
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  height: "50%",
                  borderRadius: "50%",
                  background: `linear-gradient(270deg, ${item.colors[0]} 50%, ${item.colors[1]} 50%)`,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Colored baseline */}
      <Box
        sx={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          height: "4px",
          borderRadius: "4px",
          background:
            "linear-gradient(to right, #39d1f9, #ffb400, #01827c, #018bff, #ff3200, #9896ff)",
        }}
      />
    </Box>
  );
}
