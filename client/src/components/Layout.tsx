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
    }>({ id: "", username: "", avatarKey: "" });
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
