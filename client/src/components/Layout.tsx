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
    useEffect(() => {
        // Announce self as online
        socket.emit("user:online", userData?.id);
        socket.on("disconnect", () => {});
        // Listen for status updates
        socket.on("user:status", ({ userId, status }) => {
            setOnlineUsers((prev) => {
                const updated = new Set(prev);
                status === "online"
                    ? updated.add(userId)
                    : updated.delete(userId);
                return updated;
            });
        });
        return () => {
            socket.off("user:status");
            socket.off("disconnect");
        };
    }, []);
    useEffect(() => {
        authenticate(dispatch);
    }, [dispatch]);
    useEffect(() => {
        setUserData(currentUser);
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
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            {selectedChat.username !== "" && (
                                <ChatRoom
                                    setSelectedChat={setSelectedChat}
                                    selectedChat={selectedChat}
                                    currentUser={currentUser}
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
