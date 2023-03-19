import { gql } from "@apollo/client";

export const COMMENT_POST = gql`
	mutation CommentPost(
		$postId: ID!
		$commenter: ID!
		$comment: String!
		$timestamp: String
	) {
		commentPost(
			postId: $postId
			commenter: $commenter
			comment: $comment
			timestamp: $timestamp
		) {
			id
		}
	}
`;
