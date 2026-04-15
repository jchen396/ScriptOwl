import { gql } from "@apollo/client";

export const DELETE_POST = gql`
	mutation DeletePost($publisherId: ID!, $postId: ID!) {
		deletePost(publisherId: $publisherId, postId: $postId) {
			id
		}
	}
`;
