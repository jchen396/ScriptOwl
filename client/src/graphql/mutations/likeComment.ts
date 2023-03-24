import { gql } from "@apollo/client";

export const LIKE_COMMENT = gql`
	mutation LikeComment($userId: ID!, $postId: ID!, $commentId: ID!) {
		likeComment(userId: $userId, postId: $postId, commentId: $commentId) {
			id
		}
	}
`;
