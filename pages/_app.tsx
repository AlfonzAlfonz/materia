import { createGlobalStyle, defaultTheme, Preflight, ThemeProvider } from "@xstyled/emotion";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

const theme = {
  ...defaultTheme,
  fontSizes: {
    ...defaultTheme.fontSizes,
    sm: `${13 / 16}rem`,
    md: `${18 / 16}rem`,
    lg: `${26 / 16}rem`
  }
};

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title key="title">Comaterial</title>
        <meta property="og:title" content="Comaterial" key="og_title" />
        {/* <meta
          name="description"
          content=""
          key="description"
        />
        <meta
          property="og:description"
          content=""
          key="og_description"
        /> */}
        {/* <meta property="og:image" content="/static/og-image.png" key="og_image" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://comaterial.space" key="og_url" />
        <meta property="og:site_name" content="Comaterial" />
        <meta property="og:locale" content="cs_CZ" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        {/* <link rel="icon" href="/static/favicon/apple-touch-icon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/static/favicon/apple-touch-icon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#e00034" />
        <meta name="theme-color" content="#e00034" /> */}
      </Head>
      <ThemeProvider theme={theme}>
        <Global />
        <Preflight />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;

const Global = createGlobalStyle`
  html {
    background: #EFEFEF;
  }
`;
