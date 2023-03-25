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
			createdAt {
				date
			}
			publisher {
				username
			}
			comments {
				id
				commenter {
					username
					id
					avatarKey
				}
				comment
				likes
				dislikes
				timestamp
				createdAt {
					date
				}
			}
		}
	}
`;
