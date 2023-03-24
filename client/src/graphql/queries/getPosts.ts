import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts {
		posts {
			id
			videoKey
			title
			description
			category
			views
			likes
			dislikes
			createdAt {
				date
			}
			publisher {
				username
			}
		}
	}
`;
