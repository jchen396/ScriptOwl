import { gql } from "@apollo/client";

export const UNLIKE_COMMENT = gql`
	mutation UnlikeComment(
		$userId: ID!
		$postId: ID!
		$commentId: ID!
		$commenterId: ID!
	) {
		unlikeComment(
			userId: $userId
			postId: $postId
			commentId: $commentId
			commenterId: $commenterId
		) {
			id
		}
	}
`;
