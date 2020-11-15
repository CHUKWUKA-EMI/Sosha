import React from "react";
import SignUp from "../components/SignUp";
import Header from "../components/Header";
import { Container } from "@material-ui/core";

function signup() {
	return (
		<React.Fragment>
			<Header />
			<Container maxWidth="md">
				<SignUp />
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
					paddin-top: "1em";
				`}
			</style>
		</React.Fragment>
	);
}
export default signup;
