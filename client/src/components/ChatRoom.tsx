import React from "react";
import { IUser } from "./../../../types/types";
import { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";
import { GET_AVATAR_KEYS_BY_ID } from "@/graphql/queries/getAvatarKeysById";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface Props {
    setSelectedChat: React.Dispatch<
        React.SetStateAction<{ username: string; avatarKey: string }>
    >;
    selectedChat: { username: string; avatarKey: string };
}

const ChatList: FunctionComponent<Props> = ({
    setSelectedChat,
    selectedChat,
}) => {
    return (
        <div className="fixed h-1/2 bottom-0 left-0 w-1/4 bg-black border-2 z-10 p-2">
            <div className="flex flex-col h-full w-full justify-between items-center">
                <div className="flex h-12 w-full justify-center items-center space-x-2 border-b-2 border-gray-400 bg-black p-2">
                    <Image
                        height={50}
                        width={50}
                        className="w-10 h-10 rounded-full"
                        src={
                            selectedChat?.avatarKey.startsWith(
                                "https://lh3.googleusercontent.com",
                            )
                                ? selectedChat?.avatarKey
                                : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${selectedChat?.avatarKey}`
                        }
                        alt="user photo"
                    />
                    <p className="text-white text-xl">
                        {selectedChat.username}
                    </p>
                    <CloseIcon
                        className="absolute w-8 h-8 text-white hover:text-red-400 right-0 top-0 hover:cursor-pointer"
                        onClick={() =>
                            setSelectedChat({ username: "", avatarKey: "" })
                        }
                    />
                </div>
                <div className="flex-1 w-full bg-gray-900 overflow-y-auto p-2 mt-2"></div>

                <input
                    className="h-12 w-full bg-black border border-white text-white px-2"
                    type="text"
                />
            </div>
        </div>
    );
};

export default ChatList;
