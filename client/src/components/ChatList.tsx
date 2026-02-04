import React from "react";
import { IUser } from "./../../../types/types";
import { FunctionComponent, useState } from "react";

interface Props {
    userData?: IUser;
}

const ChatList: FunctionComponent<Props> = ({ userData }) => {
    return (
        <div className="h-20 border-top border-t-2 border-whiet">
            <li className="h-full flex space-x-2 justify-left items-center">
                {userData?.following.map((userId) => (
                    <p className="text-white border-2 border-gray-200">
                        {userId}
                    </p>
                ))}
            </li>
        </div>
    );
};

export default ChatList;
