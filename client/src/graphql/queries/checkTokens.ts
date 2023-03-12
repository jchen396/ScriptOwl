import { gql } from "@apollo/client";

export const CHECK_TOKENS = gql`
	query CheckTokens {
		checkTokens {
			username
			email
			points
			avatarKey
		}
	}
`;
