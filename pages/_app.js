/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { ApolloProvider } from "@apollo/client";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { useApollo } from "../Apollo/client";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  const apolloClient = useApollo(pageProps);

  return (
    <React.Fragment>
      <Head>
        <title>Social App</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
