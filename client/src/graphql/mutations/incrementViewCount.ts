import { gql } from "@apollo/client";

export const INCREMENT_VIEW_COUNT = gql`
	mutation IncrementViewCount($postId: ID!, $views: Int!, $publisherId: ID!) {
		incrementViewCount(
			postId: $postId
			views: $views
			publisherId: $publisherId
		) {
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
				id
				username
			}
			comments {
				commenter {
					username
					id
					avatarKey
				}
				comment
				likes
				timestamp
				createdAt {
					date
				}
			}
		}
	}
`;
