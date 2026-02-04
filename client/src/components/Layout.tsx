import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "@/redux/apiCalls";
import { IUser } from "../../../types/types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Footer from "./Footer";
import ChatList from "./ChatList";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren) => {
    const { currentUser } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<IUser>();
    const [showChatList, setShowChatList] = useState<boolean>(false);
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
                <div className="fixed bottom-2 right-0 w-full bg-black">
                    <div
                        onClick={() =>
                            showChatList
                                ? setShowChatList(false)
                                : setShowChatList(true)
                        }
                        className="flex w-full hover:text-green-400 hover:cursor-pointer items-center justify-center"
                    >
                        {showChatList ? (
                            <ArrowDownwardIcon className="w-10 h-10 text-white bg-transparent" />
                        ) : (
                            <ArrowUpwardIcon className="w-10 h-10 text-white bg-transparent" />
                        )}
                        <p className="text-white">Show chat list</p>
                    </div>
                    {showChatList ? <ChatList userData={userData} /> : <></>}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
