import React, { useState } from "react";
import { FOLLOW_USER } from "@/graphql/mutations/followUser";
import { UNFOLLOW_USER } from "@/graphql/mutations/unfollowUser";
import { IUser } from "../../../../types/types";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

type Props = {
	publisherId: string;
	currentUser: IUser;
};

const FollowButton: React.FunctionComponent<Props> = ({
	currentUser,
	publisherId,
}) => {
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const router = useRouter();
	const [isFollowing, setIsFollowing] = useState<boolean>(
		currentUser?.following?.includes(publisherId)
	);
	const [followStatus, setFollowStatus] = useState<string>(
		currentUser?.following?.includes(publisherId) ? "✔ Following" : "Follow"
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
					publisherId: publisherId,
				},
			});
			setIsFollowing(true);
			setFollowStatus("✔ Following");
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
					publisherId,
				},
			});
			setIsFollowing(false);
			setFollowStatus("Follow");
		}
		setButtonDisabled(false);
	};
	return (
		<>
			<button
				onClick={() => (isFollowing ? onUnfollow() : onFollow())}
				className="p-2 px-4 bold text-white text-xl rounded-lg bg-blue-500 hover:opacity-80"
			>
				{followStatus}
			</button>
		</>
	);
};

export default FollowButton;
