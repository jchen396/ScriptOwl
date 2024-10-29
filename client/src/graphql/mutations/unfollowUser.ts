import { gql } from "@apollo/client";

export const UNFOLLOW_USER = gql`
	mutation UnfollowUser($userId: ID!, $publisherId: ID!) {
		unfollowUser(userId: $userId, publisherId: $publisherId) {
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
