import ContextProvider from '@/context';
import Header from "@/components/Header";
import "@/styles/globals.css";
import theme from "@/theme";
import Head from 'next/head';
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import { Grid, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  const cookies = typeof window === 'undefined' ? null : document.cookie;
  return (
    <>
      <Head>
        <title>App | Flex Ecosystem</title> {/* ✅ Default title for all pages */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The FLEX Web3 ecosystem" />
      </Head>
      <ContextProvider cookies={cookies}>
        <ThemeProvider theme={theme}>
            <Header />
            <Grid container width="100%" justifyContent="center">
              <Grid container sx={{ width: { xs: '100%', sm: '80%', md: '80%', lg: '80%' }, px: 2 }}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
        </ThemeProvider>
      </ContextProvider>
    </>
  );
}
