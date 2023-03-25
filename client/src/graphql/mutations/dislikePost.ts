import { gql } from "@apollo/client";

export const DISLIKE_POST = gql`
	mutation DislikePost($userId: ID!, $postId: ID!) {
		dislikePost(userId: $userId, postId: $postId) {
			id
		}
	}
`;
