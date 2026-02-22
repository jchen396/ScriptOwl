import React, { useEffect, useRef } from "react";
import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import socket from "./Socket";
import { MESSAGE_FRIEND } from "@/graphql/mutations/messageFriend";
import { useMutation, useQuery } from "@apollo/client";
import { CHAT_BY_ROOM_ID } from "@/graphql/queries/chatByRoomId";

interface Props {
    setSelectedChat: React.Dispatch<
        React.SetStateAction<{
            id: string;
            username: string;
            avatarKey: string;
            time: number;
        }>
    >;
    selectedChat: {
        id: string;
        username: string;
        avatarKey: string;
        time: number;
    };
    currentUser: any;
}

const ChatList: FunctionComponent<Props> = ({
    setSelectedChat,
    selectedChat,
    currentUser,
}) => {
    const [messageFriend] = useMutation(MESSAGE_FRIEND);
    const [message, setMessage] = React.useState<string>("");
    const [messageBoxes, setMessageBoxes] = React.useState<
        {
            avatarKey: string;
            sender: string;
            content: string;
            time: number;
        }[]
    >([]);
    const [room, setRoom] = React.useState<string>("");
    const ref = useRef<HTMLInputElement | null>(null);

    const { data, error, loading } = useQuery(CHAT_BY_ROOM_ID, {
        variables: { roomId: room },
        skip: !room || selectedChat.username === "",
    });

    const changeMessageHandler = (e: any) => {
        setMessage(e.target.value);
    };
    const sendMessage = async (e: any) => {
        e.preventDefault();
        let newMessageObj = {
            avatarKey: currentUser.avatarKey,
            sender: currentUser.username,
            content: message,
            time: new Date().getTime(),
        };
        socket.emit("message", newMessageObj, room);
        setMessageBoxes((prevState) => [...prevState, newMessageObj]);
        await messageFriend({
            variables: {
                roomId: room,
                senderUsername: currentUser.username,
                receiverUsername: selectedChat.username,
                content: message,
                time: newMessageObj.time,
                avatarKey: currentUser.avatarKey,
            },
        });
        ref.current!.value = "";
    };
    useEffect(() => {
        console.log("ChatByRoomId data: ", data);
        if (data?.chatByRoomId) {
            setMessageBoxes(data.chatByRoomId.messages);
        }
    }, [data]);

    useEffect(() => {
        if (room !== "") socket.emit("join", room);
    }, [room]);
    useEffect(() => {
        if (selectedChat.username !== "") {
            let roomNumber = [currentUser.id, selectedChat.id].sort().join("");
            setRoom(roomNumber);
            socket.on("connect", () => {});
            socket.on("disconnect", () => {});
            socket.on("message", (msg) => {
                setMessageBoxes((prevState) => [...prevState, msg]);
            });
            return () => {
                socket.off("connect");
                socket.off("disconnect");
                socket.off("message");
            };
        }
    }, [selectedChat.username]);

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
                            setSelectedChat({
                                id: "",
                                username: "",
                                avatarKey: "",
                                time: 0,
                            })
                        }
                    />
                </div>
                <div className="flex-1 w-full bg-gray-900 overflow-y-auto p-2 mt-2">
                    {messageBoxes.map((message, key) => {
                        return (
                            <div
                                key={key}
                                className="flex items-center justify-start bg-gray-700 text-white p-2 rounded-md mb-2"
                            >
                                <Image
                                    height={50}
                                    width={50}
                                    className="w-8 h-8 rounded-full inline-block mr-2"
                                    src={
                                        message.avatarKey.startsWith(
                                            "https://lh3.googleusercontent.com",
                                        )
                                            ? message.avatarKey
                                            : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${message.avatarKey}`
                                    }
                                    alt="user photo"
                                />
                                <p>
                                    {message.sender}: {message.content}
                                </p>
                                <span className="text-xs text-gray-400 ml-2">
                                    {new Date(message.time).toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        },
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <form
                    id="chatInput"
                    className="relative mb-4 flex justify-center items-center w-full self-end"
                    onSubmit={(e) => sendMessage(e)}
                >
                    <input
                        ref={ref}
                        placeholder="Enter a message..."
                        className="h-12 w-full bg-black border border-white text-white px-2"
                        onChange={(e) => changeMessageHandler(e)}
                    />
                    <button
                        form="chatInput"
                        type="submit"
                        className="mx-2 p-3 sm:p-4 rounded-2xl bg-black hover:bg-blue-600 border-blue-600 border-2 text-blue-600 hover:text-black flex justify-center items-center enter-button"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatList;
