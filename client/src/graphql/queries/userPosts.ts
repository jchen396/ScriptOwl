import { gql } from "@apollo/client";

export const USER_POSTS = gql`
	query UserPosts($postIds: [String]) {
		userPosts(postIds: $postIds) {
			id
			videoKey
			title
			category
			views
			likes
			dislikes
			duration
			thumbnail
			createdAt {
				date
			}
			publisher {
				id
				username
				avatarKey
			}
		}
	}
`;
