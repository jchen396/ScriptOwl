import { gql } from "@apollo/client";

export const COMMENT_POST = gql`
	mutation CommentPost(
		$postId: ID!
		$commenter: ID!
		$comment: String!
		$timestamp: String
	) {
		commentPost(
			postId: $postId
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
