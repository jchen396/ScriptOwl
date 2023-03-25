import { gql } from "@apollo/client";

export const LIKE_POST = gql`
	mutation LikePost($userId: ID!, $postId: ID!) {
		likePost(userId: $userId, postId: $postId) {
			id
		}
	}
`;
