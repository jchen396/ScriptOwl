import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation addUser(
		$username: String!
		$password: ID!
		$email: ID!
		$picture: String
		$emailVerified: Boolean
	) {
		addUser(
			username: $username
			password: $password
			email: $email
			picture: $picture
			emailVerified: $emailVerified
		) {
			id
			username
			password
			email
			points
		}
	}
`;
