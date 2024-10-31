import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
	query GetUserByUsername($username: String!) {
		userByUsername(username: $username) {
			id
			username
			points
			avatarKey
			likedCommentsIds
			dislikedCommentsIds
			likedPostsIds
			dislikedPostsIds
			uploadedPostIds
			watchHistory {
				postId
				createdAt {
					date
				}
			}
		}
	}
`;
