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
    console.log(data);
    return (
        <>
            <div className="w-full flex flex-col items-center ">
                <p className="text-2xl">Following:</p>
                <div className="flex flex-row items-center justify-center">
                    {data?.avatarKeysById?.following?.slice(-4).map(
                        (
                            followingData: {
                                avatarKey: string;
                                username: string;
                            },
                            key: number,
                        ) => {
                            return (
                                <div key={key}>
                                    <Image
                                        height={50}
                                        width={50}
                                        className="w-10 h-10 rounded-full"
                                        src={
                                            followingData?.avatarKey?.startsWith(
                                                "https://lh3.googleusercontent.com",
                                            )
                                                ? followingData?.avatarKey
                                                : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${followingData?.avatarKey}`
                                        }
                                        alt="user photo"
                                    />{" "}
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
            <div className="w-full flex flex-col items-center ">
                <p className="text-2xl">Followers:</p>
                <div className="flex flex-row items-center justify-center">
                    {data?.avatarKeysById?.followers
                        ?.slice(-4)
                        .map(
                            (
                                followerData: {
                                    avatarKey: string;
                                    username: string;
                                },
                                key: number,
                            ) => {
                                return (
                                    <div key={key}>
                                        <Image
                                            height={50}
                                            width={50}
                                            className="w-10 h-10 rounded-full"
                                            src={
                                                followerData?.avatarKey.startsWith(
                                                    "https://lh3.googleusercontent.com",
                                                )
                                                    ? followerData.avatarKey
                                                    : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${followerData?.avatarKey}`
                                            }
                                            alt="user photo"
                                        />{" "}
                                    </div>
                                );
                            },
                        )}
                </div>
            </div>
        </>
    );
};

export default FollowData;
