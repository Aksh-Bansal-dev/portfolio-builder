import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: AppProps): ReactElement<any, any> {
  return <Component {...pageProps} />;
}
export default MyApp;
