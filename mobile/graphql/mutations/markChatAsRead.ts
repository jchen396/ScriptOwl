import { gql } from "@apollo/client";

export const MARK_CHAT_AS_READ = gql`
    mutation MarkChatAsRead($roomId: ID!, $userId: ID!) {
        markChatAsRead(roomId: $roomId, userId: $userId) {
            id
        }
    }
`;
