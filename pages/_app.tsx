import { defaultTheme, Preflight, ThemeProvider } from "@xstyled/emotion";
import { AppProps } from "next/app";
import { FC } from "react";

const theme = {
  ...defaultTheme
};

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
