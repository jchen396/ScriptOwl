import { gql } from "@apollo/client";

export const VERIFY_USER = gql`
	mutation VerifyUser($id: ID!) {
		verifyUser(id: $id) {
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
			watchHistory
			isVerified
			verificationCode
		}
	}
`;
