import { gql } from "@apollo/client";

export const LIKE_COMMENT = gql`
	mutation LikeComment(
		$userId: ID!
		$postId: ID!
		$commentId: ID!
		$commenterId: ID!
	) {
		likeComment(
			userId: $userId
			postId: $postId
			commentId: $commentId
			commenterId: $commenterId
		) {
			id
		}
	}
`;
