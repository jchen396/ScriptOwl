import { gql } from "@apollo/client";

export const CHECK_TOKENS = gql`
	query CheckTokens {
		checkTokens {
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
			isVerified
			verificationCode
			watchHistory {
				postId
				createdAt {
					date
				}
			}
		}
	}
`;
