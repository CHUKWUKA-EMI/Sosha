import ProfileComponent from "../components/Profile";
import Community from "./community";
import Container from "@material-ui/core/Container";

export default function Profile() {
	return (
		<Community>
			<Container maxWidth="md">
				<ProfileComponent />
			</Container>
		</Community>
	);
}
