import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
    mutation FollowUser(
        $userId: ID!
        $publisherId: ID!
        $username: String
        $publisherName: String
    ) {
        followUser(
            userId: $userId
            publisherId: $publisherId
            username: $username
            publisherName: $publisherName
        ) {
            id
            username
            email
            points
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
