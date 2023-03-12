import { gql } from "@apollo/client";

export const LOG_IN_USER = gql`
	query LoginUser($username: String!, $password: ID!) {
		logInUser(username: $username, password: $password) {
			id
			username
			email
			points
			avatarKey
		}
	}
`;
