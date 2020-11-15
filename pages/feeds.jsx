import FeedComponent from "../components/Feed";
import Community from "./community";
import { Container } from "@material-ui/core";

export default function Feed() {
	return (
		<Community>
			{/* <Container> */}
			<FeedComponent />
			{/* </Container> */}
		</Community>
	);
}
