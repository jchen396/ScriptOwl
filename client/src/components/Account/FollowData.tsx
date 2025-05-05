import Image from "next/image";
import { IUser } from "../../../../types/types";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AVATAR_KEYS_BY_ID } from "@/graphql/queries/getAvatarKeysById";

type Props = {
    currentUser: IUser;
};

const FollowData: React.FunctionComponent<Props> = ({ currentUser }) => {
    const { data, error } = useQuery(GET_AVATAR_KEYS_BY_ID, {
        variables: { id: currentUser?.id },
    });
    return (
        <>
            <div className="w-full flex flex-col items-center ">
                <p className="text-2xl">Following:</p>
                <div className="flex flex-row items-center justify-center">
                    {data?.avatarKeysById.following
                        ?.slice(-4)
                        .map((imageId: string, key: number) => {
                            return (
                                <div key={key}>
                                    <Image
                                        height={50}
                                        width={50}
                                        className="w-10 h-10 rounded-full"
                                        src={
                                            imageId.startsWith(
                                                "https://lh3.googleusercontent.com"
                                            )
                                                ? imageId
                                                : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${imageId}`
                                        }
                                        alt="user photo"
                                    />{" "}
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="w-full flex flex-col items-center ">
                <p className="text-2xl">Followers:</p>
                <div className="flex flex-row items-center justify-center">
                    {data?.avatarKeysById.followers
                        ?.slice(-4)
                        .map((imageId: string, key: number) => {
                            return (
                                <div key={key}>
                                    <Image
                                        height={50}
                                        width={50}
                                        className="w-10 h-10 rounded-full"
                                        src={
                                            imageId.startsWith(
                                                "https://lh3.googleusercontent.com"
                                            )
                                                ? imageId
                                                : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${imageId}`
                                        }
                                        alt="user photo"
                                    />{" "}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default FollowData;
