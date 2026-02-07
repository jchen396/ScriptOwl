import { gql } from "@apollo/client";

export const LOG_IN_USER = gql`
    query LoginUser($username: String!, $password: ID!) {
        logInUser(username: $username, password: $password) {
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
