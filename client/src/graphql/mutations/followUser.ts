import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
	mutation FollowUser($userId: ID!, $publisherId: ID!) {
		followUser(userId: $userId, publisherId: $publisherId) {
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
			watchHistory {
				postId
				createdAt {
					date
				}
			}
			isVerified
			verificationCode
		}
	}
`;
