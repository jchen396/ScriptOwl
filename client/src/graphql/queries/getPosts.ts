import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query getPosts {
		posts {
			videoKey
			title
			description
			category
			likes
			views
			publisher {
				username
			}
		}
	}
`;
