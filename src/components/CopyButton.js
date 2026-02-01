// components/CopyButton.jsx
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function CopyButton({ text }) {
  return (
    <Tooltip title="Copy">
      <IconButton
        size="small"
        onClick={() => navigator.clipboard.writeText(text)}
        sx={{ position: "absolute", top: 8, right: 8, color: grey[50] }}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
