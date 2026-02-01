import { lightCardColor } from "@/constants/colors";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function TextInput() {
  return (
    <TextField
      type="text"
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
      }}
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
        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "& input[type=number]": {
          MozAppearance: "textfield", // Firefox
        },
        ':hover': { borderColor: 'transparent' },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: 'transparent',
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: 'transparent',
        },
      }}
    />
  );
}
