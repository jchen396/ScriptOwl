import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $avatarKey: String, $password: ID) {
		updateUser(id: $id, avatarKey: $avatarKey, password: $password) {
			id
			username
			email
			points
			avatarKey
		}
	}
`;
