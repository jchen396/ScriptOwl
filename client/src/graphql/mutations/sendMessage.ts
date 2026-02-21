import { gql } from "@apollo/client";

export const MESSAGE_FRIEND = gql`
    mutation MessageFriend(
        $roomId: ID!
        $senderId: ID!
        $receiverId: ID!
        $content: String!
        $time: Float!
    ) {
        messageFriend(
            roomId: $roomId
            senderId: $senderId
            receiverId: $receiverId
            content: $content
            time: $time
        ) {
            id
        }
    }
`;
