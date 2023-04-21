import { gql } from "@apollo/client";

export const UNDISLIKE_COMMENT = gql`
	mutation UndislikeComment(
		$userId: ID!
		$postId: ID!
		$commentId: ID!
		$commenterId: ID!
	) {
		undislikeComment(
			userId: $userId
			postId: $postId
			commentId: $commentId
			commenterId: $commenterId
		) {
			id
		}
	}
`;
