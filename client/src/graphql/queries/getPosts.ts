import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts($page: Int!) {
		posts(page: $page) {
			id
			videoKey
			title
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
