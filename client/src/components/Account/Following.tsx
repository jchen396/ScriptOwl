import { IUser } from "../../../../types/types";
import React from "react";

type Props = {
    currentUser: IUser;
};

const Following: React.FunctionComponent<Props> = ({ currentUser }) => {
    return (
        <>
            <div className="w-full flex flex-col items-center ">
                <p className="text-2xl">Following:</p>
                {currentUser?.following?.map((user, key) => {
                    return <div key={key}>{user}</div>;
                })}
            </div>
        </>
    );
};

export default Following;
