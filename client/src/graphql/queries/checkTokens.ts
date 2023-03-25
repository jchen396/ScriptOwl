import { gql } from "@apollo/client";

export const CHECK_TOKENS = gql`
	query CheckTokens {
		checkTokens {
			id
			username
			email
			points
			avatarKey
			likedCommentsIds
			dislikedCommentsIds
			likedPostsIds
			dislikedPostsIds
		}
	}
`;
