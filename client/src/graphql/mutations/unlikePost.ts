import { gql } from "@apollo/client";

export const UNLIKE_POST = gql`
	mutation UnlikePost($userId: ID!, $postId: ID!) {
		unlikePost(userId: $userId, postId: $postId) {
			id
		}
	}
`;
