import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "../Apollo/client";
export default class MyApp extends App {
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps } = this.props;

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
					<ApolloProvider client={client}>
						<Component {...pageProps} />
					</ApolloProvider>
				</ThemeProvider>
			</React.Fragment>
		);
	}
}
