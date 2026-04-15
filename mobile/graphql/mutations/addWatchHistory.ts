import { gql } from "@apollo/client";

export const ADD_WATCH_HISTORY = gql`
	mutation AddWatchHistory($postId: ID!, $userId: ID!) {
		addWatchHistory(postId: $postId, userId: $userId) {
			watchHistory {
				postId
				createdAt {
					date
				}
			}
		}
	}
`;
