import styled from "@emotion/styled";
import { defaultTheme, Preflight, ThemeProvider, createGlobalStyle } from "@xstyled/emotion";
import { AppProps } from "next/app";
import { FC } from "react";

const theme = {
  ...defaultTheme
};

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Preflight />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;

const Global = createGlobalStyle`
  html {
    background: #EFEFEF;
  }
`;
