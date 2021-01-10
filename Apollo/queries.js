import { gql } from "@apollo/client";

export const GET_TWEETS = gql`
	query {
		tweets {
			id
			content
			imgUrl
			createdAt
			User {
				id
				firstName
				lastName
				email
				imgUrl
			}
			Comments {
				id
				comment
				createdAt
				User {
					id
					firstName
					lastName
					imgUrl
				}
			}
			Likes {
				id
				value
				UserId
			}
		}
	}
`;
