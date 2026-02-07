import { gql } from "@apollo/client";

export const CHECK_TOKENS = gql`
    query CheckTokens {
        checkTokens {
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
            isVerified
            verificationCode
            watchHistory {
                postId
                createdAt {
                    date
                }
            }
        }
    }
`;
