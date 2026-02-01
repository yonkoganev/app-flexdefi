import { lightCardColor } from "@/constants/colors";
import { TextField } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useState } from "react";

export default function StakingDaysInput({ value, onChange, disabled }) {
  const handleChange = (e) => {
    // Allow empty (for typing), otherwise only digits
    const v = e.target.value;
    if (v === "" || /^[0-9]+$/.test(v)) {
      onChange(v);
    }
  };

  const handleBlur = () => {
    if (value === "") return;

    let num = Number(value);

    if (num < 150) num = 150;
    if (num > 3653) num = 3653;

    onChange(String(num));
  };

  return (
    <TextField
      value={value}
      disabled={disabled}
      onChange={handleChange}
      onBlur={handleBlur}
      type="text"               // IMPORTANT: not number
      size="small"
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
      }}
      placeholder="150 - 3653"
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        backgroundColor: disabled ? grey[700] : lightCardColor,

        "& .MuiInputBase-input": {
          height: 35,
          padding: "0 10px",
          lineHeight: "35px",
          color: disabled ? grey[300] : grey[50],
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
          borderColor: disabled ? 'transparent' : blue[500],
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: blue[500],
        },
        /* Disabled border cleanup */
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        }
      }}
    />
  );
}
