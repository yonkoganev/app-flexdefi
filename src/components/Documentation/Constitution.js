import { useEffect, useState } from "react";
import WhitepaperRenderer from "./WhitepaperRenderer";
import { Box, CircularProgress } from "@mui/material";

export default function Constitution() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/whitepaper.md")
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, []);

  if (!content) {
    return (
      <Box display="flex" justifyContent="center" mt={10} width="100%" ml={-20}>
        <CircularProgress />
      </Box>
    );
  }

  return <WhitepaperRenderer content={content} />;
}
