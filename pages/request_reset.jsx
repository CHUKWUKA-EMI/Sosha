import React from "react";
import ResetRequest from "../components/ResetRequest";
import Header from "../components/Header";
import { Container } from "@material-ui/core";

function request_reset() {
	return (
		<React.Fragment>
			<Header />
			<Container maxWidth="md">
				<ResetRequest />
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
export default request_reset;
