import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
	query GetUserByEmail($email: String!) {
		userByEmail(email: $email) {
			username
		}
	}
`;
