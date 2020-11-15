import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#32506D",
		},
		secondary: {
			main: "#c2d6d6",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
});

export default theme;
