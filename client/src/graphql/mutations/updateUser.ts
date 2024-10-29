import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
	mutation UpdateUser(
		$id: ID!
		$avatarKey: String
		$password: ID
		$username: String
	) {
		updateUser(
			id: $id
			avatarKey: $avatarKey
			password: $password
			username: $username
		) {
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
