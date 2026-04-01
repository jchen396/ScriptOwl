import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "@/redux/apiCalls";
import { IUser } from "../../../types/types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Footer from "./Footer";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import socket from "./Socket";
import { useQuery } from "@apollo/client";
import { GET_UNREAD_ROOMS } from "@/graphql/queries/getUnreadRooms";
import client from "../../apollo-client";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren) => {
    const { currentUser } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<IUser>();
    const [showChatList, setShowChatList] = useState<boolean>(false);
    const [selectedChat, setSelectedChat] = useState<{
        id: string;
        username: string;
        avatarKey: string;
        time: number;
    }>({ id: "", username: "", avatarKey: "", time: 0 });
    const [onlineUsers, setOnlineUsers] = useState(new Set<string | null>());
    const [unreadRoomsData, setUnreadRoomsData] = useState<Map<string, number>>(
        new Map(),
    );
    useEffect(() => {
        console.log(unreadRoomsData);
    }, [unreadRoomsData]);

    useEffect(() => {
        if (!userData?.id) return;
        const getUnreadMessages = async () => {
            const { data } = await client.query({
                query: GET_UNREAD_ROOMS,
                variables: {
                    userId: userData.id,
                },
            });
            data.getUnreadRooms?.forEach(
                (room: { roomId: string; unreadCount: number }) => {
                    setUnreadRoomsData((prev) => {
                        const newMap = new Map(prev);
                        newMap.set(room.roomId, room.unreadCount);
                        return newMap;
                    });
                },
            );
        };
        getUnreadMessages();
        socket.on("disconnect", () => {});
        return () => {
            socket.off("disconnect");
        };
    }, [userData]);
    useEffect(() => {
        authenticate(dispatch);
    }, [dispatch]);
    useEffect(() => {
        if (currentUser != null) {
            setUserData(currentUser);
            socket.emit("user:online", currentUser.id);
            socket.on("users:snapshot", (userIds: string[]) => {
                // populate your local state with everyone already online
                setOnlineUsers(new Set(userIds));
            });
            socket.on("user:status", ({ userId, status }) => {
                setOnlineUsers((prev) => {
                    const updated = new Set(prev);
                    status === "online"
                        ? updated.add(userId)
                        : updated.delete(userId);
                    return updated;
                });
            });
            socket.on("notifyUnread", (roomId: string) => {
                setUnreadRoomsData((prev) => {
                    const newMap = new Map(prev);
                    //check if there are any
                    const currentUnreadMessages = newMap.get(roomId);
                    if (currentUnreadMessages) {
                        newMap.set(roomId, currentUnreadMessages + 1);
                    } else {
                        newMap.set(roomId, 1);
                    }
                    return newMap;
                });
            });
        }
        return () => {
            socket.off("user:status");
        };
    }, [currentUser]);
    return (
        <>
            <div className="bg-black min-w-full min-h-screen flex flex-col">
                <Navbar userData={userData} />
                <main className="flex-1">{children}</main>
                {
                    // Chat list and chat room components are conditionally rendered based on state
                    currentUser && (
                        <>
                            <div className="fixed bottom-0 w-full z-10 w-full flex-col items-center justify-center">
                                <div
                                    onClick={() =>
                                        setShowChatList(!showChatList)
                                    }
                                    className="flex bg-black w-64 md:w-80 max-w-sm mx-auto hover:text-green-400 hover:cursor-pointer border-2 items-center justify-center px-2 py-1 rounded-lg shadow-lg"
                                >
                                    {showChatList ? (
                                        <ArrowDownwardIcon className="w-10 h-10 text-white bg-transparent" />
                                    ) : (
                                        <ArrowUpwardIcon className="w-10 h-10 text-white bg-transparent" />
                                    )}
                                    <p className="text-white">Show chat list</p>
                                </div>
                                {showChatList ? (
                                    <ChatList
                                        userData={userData}
                                        setSelectedChat={setSelectedChat}
                                        selectedChat={selectedChat}
                                        onlineUsers={onlineUsers}
                                        unreadRoomsData={unreadRoomsData}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            {selectedChat.username !== "" && showChatList && (
                                <ChatRoom
                                    setSelectedChat={setSelectedChat}
                                    selectedChat={selectedChat}
                                    currentUser={currentUser}
                                    setUnreadRoomsData={setUnreadRoomsData}
                                />
                            )}
                        </>
                    )
                }
                <Footer />
            </div>
        </>
    );
};

export default Layout;
