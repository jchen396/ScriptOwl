import { gql } from "@apollo/client";

export const GET_AVATAR_KEYS_BY_ID = gql`
    query getAvatarKeysById($id: ID!) {
        avatarKeysById(id: $id) {
            following {
                id
                username
                avatarKey
            }
            followers {
                id
                username
                avatarKey
            }
            friends {
                id
                username
                avatarKey
            }
        }
    }
`;
