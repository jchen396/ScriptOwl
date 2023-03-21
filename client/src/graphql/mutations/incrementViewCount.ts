import { gql } from "@apollo/client";

export const INCREMENT_VIEW_COUNT = gql`
	mutation IncrementViewCount($postId: ID!, $views: Int!) {
		incrementViewCount(postId: $postId, views: $views) {
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
