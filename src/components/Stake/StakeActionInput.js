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
      value={inputValue}
      onChange={(e) => {
        const v = e.target.value;
        setInputValue(v);
        setInputError(validateInput(v));
      }}
      error={!!inputError}
      helperText={inputError}
      placeholder={actionConfig.inputLabel}
      type={action === 2 ? 'number' : 'text'}
      inputProps={{
        maxLength: action === 0 ? 20 : undefined,
        inputMode: action === 2 ? 'decimal' : 'text',
      }}
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        backgroundColor: lightCardColor,
        '& .MuiInputBase-input': {
          height: 35,
          padding: '0 10px',
          lineHeight: '35px',
          color: grey[50],
          fontWeight: 700,
        },
      }}
    />
  );
}
