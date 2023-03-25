import { gql } from "@apollo/client";

export const UNDISLIKE_POST = gql`
	mutation UndislikePost($userId: ID!, $postId: ID!) {
		undislikePost(userId: $userId, postId: $postId) {
			id
		}
	}
`;
