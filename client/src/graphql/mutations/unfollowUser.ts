import { gql } from "@apollo/client";

export const UNFOLLOW_USER = gql`
	mutation UnfollowUser($userId: ID!, $publisherId: ID!) {
		unfollowUser(userId: $userId, publisherId: $publisherId) {
			id
		}
	}
`;
