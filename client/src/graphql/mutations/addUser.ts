import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation addUser($username: String!, $password: ID!, $email: ID!) {
		addUser(username: $username, password: $password, email: $email) {
			id
			username
			password
			email
			points
		}
	}
`;
