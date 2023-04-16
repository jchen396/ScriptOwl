import { gql } from "@apollo/client";

export const VERIFY_USER = gql`
	mutation VerifyUser($id: ID!) {
		verifyUser(id: $id) {
			id
			username
			email
			points
			avatarKey
			likedCommentsIds
			dislikedCommentsIds
			likedPostsIds
			dislikedPostsIds
			isVerified
			verificationCode
		}
	}
`;
