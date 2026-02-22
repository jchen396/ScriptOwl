import { gql } from "@apollo/client";

export const MESSAGE_FRIEND = gql`
    mutation MessageFriend(
        $roomId: ID!
        $senderUsername: String!
        $receiverUsername: String!
        $content: String!
        $time: Float!
        $avatarKey: String!
    ) {
        messageFriend(
            roomId: $roomId
            senderUsername: $senderUsername
            receiverUsername: $receiverUsername
            content: $content
            time: $time
            avatarKey: $avatarKey
        ) {
            id
        }
    }
`;
