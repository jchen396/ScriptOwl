import { gql } from "@apollo/client";

export const GET_UNREAD_ROOMS = gql`
    query GetUnreadRooms($userId: ID!) {
        getUnreadRooms(userId: $userId) {
            roomId
            unreadCount
        }
    }
`;
