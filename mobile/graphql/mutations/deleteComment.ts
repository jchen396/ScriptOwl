import { gql } from "@apollo/client";

export const DELETE_COMMENT = gql`
	mutation DeleteComment(
		$commentId: ID!
		$postId: ID!
		$publisherId: ID!
		$commenter: ID!
	) {
		deleteComment(
			commentId: $commentId
			postId: $postId
			publisherId: $publisherId
			commenter: $commenter
		) {
			id
		}
	}
`;
