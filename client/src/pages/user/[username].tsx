import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_USERNAME } from "@/graphql/queries/getUserbyUsername";
import client from "../../../apollo-client";
import { IPost, IUser } from "../../../../types/types";
import Image from "next/image";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import VideoRow from "../../components/User/VideoRow";
import FollowButton from "@/components/Watch/FollowButton";
import { useSelector } from "react-redux";

type Props = {};

const Profile: FunctionComponent<Props> = () => {
	const router = useRouter();
	const { currentUser } = useSelector((state: any) => state.user);
	const username = router.query.username;
	const [targetUser, setTargetUser] = useState<IUser | null>(null);
	const [profileLoading, setProfileLoading] = useState<boolean>(true);
	const [videosLoading, setVideosLoading] = useState<boolean>(true);

	const [videosData, setVideosData] = useState<IPost[]>([]);
	const fetchUserInfo = async () => {
		try {
			const { data } = await client.query({
				query: GET_USER_BY_USERNAME,
				variables: {
					username,
				},
			});
			return await data.userByUsername;
		} catch (e) {}
	};
	const getLikedVideos = async () => {
		try {
			const { data } = await client.query({
				query: USER_POSTS,
				variables: {
					postIds: targetUser?.likedPostsIds,
				},
			});
			return await data.userPosts;
		} catch (e) {}
	};
	//Load user data
	useEffect(() => {
		if (username) {
			fetchUserInfo().then((data) => {
				setTargetUser(data);
			});
			setProfileLoading(false);
		}
	}, [username]);
	useEffect(() => {
		if (targetUser) {
			console.log(targetUser?.likedPostsIds);
			getLikedVideos().then((data) => {
				setVideosData(data);
			});
			setVideosLoading(false);
		}
	}, [targetUser]);
	return (
		<>
			<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
				{profileLoading ? (
					<h1 className="text-white">Loading profile...</h1>
				) : (
					<>
						{targetUser !== null ? (
							<div className="p-10 w-full h-screen flex flex-col justify-between items-center md:flex-row space-y-10">
								<div className="h-full flex flex-col justify-center items-center basis-1/2 space-y-10 md:py-20">
									<h1 className="text-white text-4xl">
										{targetUser?.username}
									</h1>
									<Image
										height={100}
										width={100}
										className="w-32 h-32 rounded"
										src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${targetUser.avatarKey}`}
										alt="user photo"
									/>
									<FollowButton
										publisherId={targetUser.id}
										currentUser={currentUser}
									/>
									<h2 className="text-slate-500 text-xl">
										Points: {targetUser?.points}
									</h2>
								</div>
								<div className="h-3/4 border-2 flex flex-col justify-between items-center basis-1/2 space-y-10 md:py-20">
									<h1 className="h-full text-slate-500 text-2xl">
										Liked videos
									</h1>
									<div className="h-full w-4/5 ">
										{videosLoading ? (
											<>
												<h2 className="flex justify-center items-center text-xl text-slate-500">
													Loading videos...
												</h2>
											</>
										) : (
											<>
												{targetUser?.likedPostsIds
													.length > 0 ? (
													<div className="w-full h-full flex flex-col items-center justify-start font-mono ">
														<VideoRow
															posts={videosData}
														/>
													</div>
												) : (
													<>
														<h2 className="flex justify-center items-center text-xl text-slate-500">
															This user has no
															liked videos.
														</h2>
													</>
												)}
											</>
										)}
									</div>
								</div>
							</div>
						) : (
							<h1 className="text-white text-2xl">
								Could not find user {username}.
							</h1>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Profile;
