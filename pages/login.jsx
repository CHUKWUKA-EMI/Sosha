import React from "react";
import Login from "../components/Login";
import Header from "../components/Header";
import { Container } from "@material-ui/core";

function login() {
	return (
		<React.Fragment>
			<Header />
			<Container maxWidth="md">
				<Login />
			</Container>

			<style global jsx>
				{`
					body,
					a,
					label,
					span,
					p,
					h {
						font-family: "Source Sans Pro", sans-serif !important;
					}
				`}
			</style>
		</React.Fragment>
	);
}
export default login;
