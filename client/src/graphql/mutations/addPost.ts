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
		$thumbnail: ID!
	) {
		addPost(
			videoKey: $videoKey
			title: $title
			description: $description
			category: $category
			publisher: $publisher
			transcript: $transcript
			duration: $duration
			thumbnail: $thumbnail
		) {
			videoKey
			title
			thumbnail
			description
			category
			publisher {
				id
			}
		}
	}
`;
