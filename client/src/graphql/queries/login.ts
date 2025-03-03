import { gql } from "@apollo/client";

export const LOG_IN_USER = gql`
	query LoginUser($username: String!, $password: ID!) {
		logInUser(username: $username, password: $password) {
			id
			username
			email
			points
			followers
			following
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
			isVerified
			verificationCode
		}
	}
`;
