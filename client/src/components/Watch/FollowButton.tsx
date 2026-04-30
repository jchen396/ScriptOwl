import React, { useState } from "react";
import { FOLLOW_USER } from "@/graphql/mutations/followUser";
import { UNFOLLOW_USER } from "@/graphql/mutations/unfollowUser";
import { IUser } from "../../../../types/types";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

type Props = {
    publisherId: string;
    currentUser: IUser;
    publisherName: string;
};

const FollowButton: React.FunctionComponent<Props> = ({
    currentUser,
    publisherId,
    publisherName,
}) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState<boolean>(
        currentUser?.following?.some((u) => u.id === publisherId),
    );
    const [followUser] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    const onFollow = async () => {
        if (!currentUser) {
            router.push("/login");
        } else {
            if (buttonDisabled) return;
            setButtonDisabled(true);
            const { data } = await followUser({
                variables: {
                    userId: currentUser?.id,
                    username: currentUser?.username,
                    publisherId: publisherId,
                    publisherName: publisherName,
                },
            });
            setIsFollowing(true);
        }
        setButtonDisabled(false);
    };
    const onUnfollow = async () => {
        if (!currentUser) {
            router.push("/login");
        } else {
            if (buttonDisabled) return;
            setButtonDisabled(true);
            const { data } = await unfollowUser({
                variables: {
                    userId: currentUser?.id,
                    username: currentUser?.username,
                    publisherId: publisherId,
                    publisherName: publisherName,
                },
            });
            setIsFollowing(false);
        }
        setButtonDisabled(false);
    };
    return (
        <button
            onClick={() => (isFollowing ? onUnfollow() : onFollow())}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                isFollowing
                    ? "bg-gray-800/60 text-gray-400 border border-gray-700/50 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/10"
                    : "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/20"
            }`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;
