import React from "react";
import { IUser } from "./../../../types/types";
import { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";
import { GET_AVATAR_KEYS_BY_ID } from "@/graphql/queries/getAvatarKeysById";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
}

const ChatList: FunctionComponent<Props> = ({ setSelectedChat }) => {
    return (
        <div className="fixed h-1/2 bottom-0 left-0 w-1/4 bg-black border-2 z-0">
            <CloseIcon
                className="w-10 h-10 text-white hover:cursor-pointer right-0 top-0 absolute"
                onClick={() => setSelectedChat("")}
            />
        </div>
    );
};

export default ChatList;
