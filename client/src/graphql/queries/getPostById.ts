import { gql } from "@apollo/client";

export const GET_POST_BY_ID = gql`
	query GetPostById($id: ID!) {
		post(id: $id) {
			id
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
