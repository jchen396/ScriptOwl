import { gql } from "@apollo/client";

export const ADD_POST = gql`
	mutation AddPost(
		$videoKey: ID!
		$title: String!
		$description: String
		$category: String
		$publisher: ID!
		$transcript: String
		$duration: Int
	) {
		addPost(
			videoKey: $videoKey
			title: $title
			description: $description
			category: $category
			publisher: $publisher
			transcript: $transcript
			duration: $duration
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
