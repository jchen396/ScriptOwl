import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts {
		posts {
			id
			videoKey
			title
			description
			category
			likes
			views
			createdAt {
				date
			}
			publisher {
				username
			}
		}
	}
`;
