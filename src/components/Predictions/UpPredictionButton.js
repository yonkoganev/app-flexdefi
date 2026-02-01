import { Box, Typography } from "@mui/material";

const UpPredictionButton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 90,
        cursor: "pointer",
        "&:hover path": {
          fill: "#5bc7a0",
        },
      }}
    >
      <svg
        viewBox="0 0 300 90"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <path
          d="
            M30 0
            Q150 -20 270 0
            Q300 15 300 40
            V90
            H0
            V40
            Q0 15 30 0
            Z
          "
          fill="#6fd2ad"
        />
        <text
          x="150"
          y="38"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill="#fff"
        >
          UP
        </text>
        <text
          x="150"
          y="62"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#fff"
        >
          1.86x Payout
        </text>
      </svg>
    </Box>
  );
};

export default UpPredictionButton;
