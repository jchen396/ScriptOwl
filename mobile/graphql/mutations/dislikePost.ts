import { gql } from "@apollo/client";

export const DISLIKE_POST = gql`
	mutation DislikePost($userId: ID!, $postId: ID!, $publisherId: ID!) {
		dislikePost(
			userId: $userId
			postId: $postId
			publisherId: $publisherId
		) {
			id
		}
	}
`;
