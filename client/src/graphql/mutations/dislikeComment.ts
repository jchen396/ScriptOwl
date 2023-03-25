import { gql } from "@apollo/client";

export const DISLIKE_COMMENT = gql`
	mutation DislikeComment($userId: ID!, $postId: ID!, $commentId: ID!) {
		dislikeComment(
			userId: $userId
			postId: $postId
			commentId: $commentId
		) {
			id
		}
	}
`;
