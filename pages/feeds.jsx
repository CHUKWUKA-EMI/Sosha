import FeedComponent from "../components/Feed";
import Community from "./community";
import Container from "@material-ui/core/Container";

export default function Feed() {
	return (
		<Community>
			<Container maxWidth="lg">
				<FeedComponent />
			</Container>
		</Community>
	);
}
