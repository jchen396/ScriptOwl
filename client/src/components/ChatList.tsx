import React from "react";
import { IUser } from "./../../../types/types";
import { FunctionComponent, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AVATAR_KEYS_BY_ID } from "@/graphql/queries/getAvatarKeysById";
import Image from "next/image";

interface Props {
    userData?: IUser;
}

const ChatList: FunctionComponent<Props> = ({ userData }) => {
    const { data, error } = useQuery(GET_AVATAR_KEYS_BY_ID, {
        variables: { id: userData?.id },
    });
    return (
        <div className="h-20 border-top border-t-2 border-whiet">
            <li className="h-full flex space-x-2 justify-left items-center mx-4">
                {data?.avatarKeysById.friends.map(
                    (
                        friendData: { avatarKey: string; username: string },
                        key: number,
                    ) => {
                        return (
                            <div
                                key={key}
                                className="flex justify-center items-center space-x-2 hover:border-2 border-gray-400 rounded-md py-2 px-4
                                hover:bg-gray-700 hover:cursor-pointer"
                            >
                                <Image
                                    height={50}
                                    width={50}
                                    className="w-10 h-10 rounded-full"
                                    src={
                                        friendData?.avatarKey.startsWith(
                                            "https://lh3.googleusercontent.com",
                                        )
                                            ? friendData?.avatarKey
                                            : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${friendData?.avatarKey}`
                                    }
                                    alt="user photo"
                                />{" "}
                                <p className="text-white text-md">
                                    {friendData.username}
                                </p>
                            </div>
                        );
                    },
                )}
            </li>
        </div>
    );
};

export default ChatList;
