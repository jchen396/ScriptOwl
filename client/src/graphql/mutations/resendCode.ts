import { gql } from "@apollo/client";

export const RESEND_CODE = gql`
	mutation ResendCode($id: ID!, $email: ID!) {
		resendCode(id: $id, email: $email) {
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
