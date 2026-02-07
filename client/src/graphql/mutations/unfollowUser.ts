import { gql } from "@apollo/client";

export const UNFOLLOW_USER = gql`
    mutation UnfollowUser(
        $userId: ID!
        $publisherId: ID!
        $username: String
        $publisherName: String
    ) {
        unfollowUser(
            userId: $userId
            publisherId: $publisherId
            username: $username
            publisherName: $publisherName
        ) {
            id
            username
            email
            points
            followers {
                userId
                username
            }
            following {
                userId
                username
            }
            friends {
                userId
                username
            }
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
