// components/Docs/WhitepaperRenderer.jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { Typography, Box, Grid } from "@mui/material";
import CopyButton from "../CopyButton";
import { blue, grey } from "@mui/material/colors";
import Image from "next/image";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function WhitepaperRenderer({ content }) {
  return (
    <Grid container width="100%" display="flex" justifyContent="center">
      <Box my={10} sx={{ width: { lg: '80%', md: '80%', sm: '90%', xs: '100%' }, mt: 15 }}>
        <Grid container width="100%" gap={2} display="flex" alignItems="center">
          <Image alt="logo" src="/assets/flexsquarelogo.png" height={60} width={60} style={{ filter: 'greyscale(100%)' }} />
          <Typography fontSize={35} color={blue[300]} fontWeight={900}>
            PROTOCOL CONSTITUTION v1.0.0
          </Typography>
        </Grid>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          h1: ({ children }) => {
            const id = slugify(children);
            return (
              <Typography id={id} fontSize={35} color={blue[300]} fontWeight={900} mt={2} mb={2}>
                {children}
              </Typography>
            );
          },
          h2: ({ children }) => {
            const id = slugify(children);
            return (
              <Typography id={id} fontSize={20} color={grey[50]} fontWeight={800} mt={5} mb={2}>
                {children}
              </Typography>
            );
          },
          h3: ({ children }) => {
            const id = slugify(children);
            return (
              <Typography id={id} fontSize={18} color={grey[50]} fontWeight={700} mt={4} mb={1}>
                {children}
              </Typography>
            );
          },
          ul: ({ children }) => (
            <Box
              component="ul"
              sx={{
                pl: 4,        // 👈 left padding (spacing)
                mb: 2,
              }}
            >
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box
              component="ol"
              sx={{
                pl: 4,
                mb: 2,
              }}
            >
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography
              component="li"
              sx={{
                mb: 1,
                lineHeight: 1.7,
              }}
            >
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography fontSize={14} color={grey[50]} sx={{ lineHeight: 1.2, mb: 1, letterSpacing: '-0px', fontWeight: 500 }}>
              {children}
            </Typography>
          ),
          code: ({ inline, children, className }) => {
            if (inline) {
              return (
                <Box
                  component="code"
                  sx={{
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                    bgcolor: "grey.900",
                    fontFamily: "JetBrains Mono",
                    fontSize: "0.9em",
                  }}
                >
                  {children}
                </Box>
              );
            }

            // 👇 IMPORTANT: DO NOT RETURN NULL
            return (
              <code className={className} style={{ whiteSpace: "pre", display: "block" }}>
                {children}
              </code>
            );
          },

          // CODE BLOCKS ( ``` )
          pre: ({ children }) => (
            <Box
              sx={{
                position: "relative",
                pl: 4,               // 👈 LEFT SPACE
                pr: 2,
                py: 2,
                mb: 3,
                color: 'red',
                bgcolor: "#0f1115",
                border: "1px solid #1f2937",
                borderRadius: 2,
                fontFamily: "JetBrains Mono",
                fontSize: "0.9rem",
                overflowX: "auto",
              }}
            >
              <CopyButton text={children?.props?.children} />
              {children}
            </Box>
          )
        }}
      >
        {content}
      </ReactMarkdown>
      </Box>
    </Grid>
  );
}
