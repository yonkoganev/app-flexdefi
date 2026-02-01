// pages/docs.jsx or Constitution.js
import { useEffect, useState } from "react";
import WhitepaperRenderer from "@/components/Documentation/WhitepaperRenderer";
import { Box, CircularProgress } from "@mui/material";

export default function Docs() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/whitepaper.md")
      .then((res) => res.text())
      .then(setContent);
  }, []);

  if (!content) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return <WhitepaperRenderer content={content} />;
}
