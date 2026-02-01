
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

const DotPattern = () => {
  // EXACT row structure from your screenshot:
  const rows = [
    1,  // row 1
    2,  // row 2
    3,  // row 3
    4,  // row 4
    5,  // row 5
    6,  // row 6
    7,  // row 7
  ];

  return (
    <Box
      sx={{
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        aspectRatio: '1/1',
        position: "absolute",
        "@keyframes blinkAnimation": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.4 },
          "100%": { opacity: 1 }
        }
      }}
    >
      {rows.map((count, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            height: '12.5%',
            display: "flex",
            justifyContent: "flex-end",
            marginTop: rowIndex === 0 ? 0 : "5px", // EXACT overlapping spacing effect
            gap: "10px"
          }}
        >
          {Array.from({ length: count }).map((_, colIndex) => (
            <Box
              key={colIndex}
              sx={{
                height: '100%',
                borderRadius: "50%",
                aspectRatio: '1/1',
                background: blue[400],
                animation: "blinkAnimation 3s ease-in-out infinite",
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default DotPattern;
