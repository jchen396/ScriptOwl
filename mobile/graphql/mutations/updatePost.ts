import { gql } from "@apollo/client";

export const UPDATE_POST = gql`
	mutation UpdatePost(
		$publisherId: ID!
		$postId: ID!
		$title: String
		$description: String
		$category: String
	) {
		updatePost(
			publisherId: $publisherId
			postId: $postId
			title: $title
			description: $description
			category: $category
		) {
			id
		}
	}
`;
