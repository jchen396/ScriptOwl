import { gql } from "@apollo/client";

export const ADD_POST = gql`
	mutation AddPost(
		$videoKey: ID!
		$title: String!
		$description: String
		$category: String
		$publisher: ID!
	) {
		addPost(
			videoKey: $videoKey
			title: $title
			description: $description
			category: $category
			publisher: $publisher
		) {
			videoKey
			title
			description
			category
			publisher {
				id
			}
		}
	}
`;
