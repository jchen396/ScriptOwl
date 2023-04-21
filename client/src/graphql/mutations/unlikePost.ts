import { gql } from "@apollo/client";

export const UNLIKE_POST = gql`
	mutation UnlikePost($userId: ID!, $postId: ID!, $publisherId: ID!) {
		unlikePost(
			userId: $userId
			postId: $postId
			publisherId: $publisherId
		) {
			id
		}
	}
`;
