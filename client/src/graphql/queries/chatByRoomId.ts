import { gql } from "@apollo/client";

export const CHAT_BY_ROOM_ID = gql`
    query ChatByRoomId($roomId: String!) {
        chatByRoomId(roomId: $roomId) {
            roomId
            messages {
                sender
                content
                time
                avatarKey
            }
        }
    }
`;
