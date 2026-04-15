import { gql } from "@apollo/client";

export const COMMENT_POST = gql`
	mutation CommentPost(
		$postId: ID!
		$publisherId: ID!
		$commenter: ID!
		$comment: String!
		$timestamp: String
	) {
		commentPost(
			postId: $postId
			publisherId: $publisherId
			commenter: $commenter
			comment: $comment
			timestamp: $timestamp
		) {
			id
			videoKey
			title
			description
			category
			likes
			views
			createdAt {
				date
			}
			publisher {
				id
				username
			}
			comments {
				id
				commenter {
					username
					id
					avatarKey
				}
				comment
				likes
				dislikes
				timestamp
				createdAt {
					date
				}
			}
		}
	}
`;
