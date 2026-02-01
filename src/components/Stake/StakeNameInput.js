import { lightCardColor } from "@/constants/colors";
import { TextField } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export default function StakeNameInput({ value, onChange }) {
  const handleChange = (e) => {
      // Allow empty (for typing), otherwise only digits
      const v = e.target.value;
      onChange(v);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      type="text"               // IMPORTANT: not number
      size="small"
      placeholder="Stake name"
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        backgroundColor: lightCardColor,

        "& .MuiInputBase-input": {
          height: 35,
          padding: "0 10px",
          lineHeight: "35px",
          color: grey[50],
          fontWeight: 900,
        },

        /* Remove arrows (Chrome, Safari, Edge) */
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "& input": {
          MozAppearance: "textfield",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: blue[500],
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: blue[500],
        }
      }}
    />
  );
}
