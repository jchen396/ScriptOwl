import { gql } from "@apollo/client";

export const MESSAGE_FRIEND = gql`
    mutation MessageFriend(
        $roomId: ID!
        $senderUsername: String!
        $senderId: ID!
        $receiverUsername: String!
        $receiverId: ID!
        $content: String!
        $time: Float!
        $avatarKey: String!
    ) {
        messageFriend(
            roomId: $roomId
            senderUsername: $senderUsername
            senderId: $senderId
            receiverUsername: $receiverUsername
            receiverId: $receiverId
            content: $content
            time: $time
            avatarKey: $avatarKey
        ) {
            id
        }
    }
`;
