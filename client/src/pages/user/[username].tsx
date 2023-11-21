import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_USERNAME } from "@/graphql/queries/getUserbyUsername";
import client from "../../../apollo-client";
import { IUser } from "../../../../types/types";
import Image from "next/image";

type Props = {};

const Profile: FunctionComponent<Props> = () => {
	const router = useRouter();
	const username = router.query.username;
	const [targetUser, setTargetUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
	useEffect(() => {
		if (username) {
			fetchUserInfo().then((data) => {
				setTargetUser(data);
			});
			setIsLoading(false);
		}
	}, [username]);
	return (
		<>
			<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
				{isLoading ? (
					<h1 className="text-white">Loading...</h1>
				) : (
					<>
						{targetUser !== null ? (
							<div className="p-10 w-full h-full flex flex-col justify-between items-center md:flex-row space-y-10">
								<div className="h-full flex flex-col justify-between items-center basis-1/2 space-y-10 md:py-20">
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
									<button className="p-2 px-4 bold text-white text-xl rounded-lg bg-blue-500 hover:opacity-80">
										Follow
									</button>
									<h2 className="text-slate-500 text-xl">
										Points: {targetUser?.points}
									</h2>
								</div>
								<div className="h-full border-2 flex flex-col justify-between items-center basis-1/2 space-y-10 md:py-20">
									<h1 className="h-1/2 text-slate-500 text-2xl">
										Liked videos
									</h1>
									<div className="h-1/2 w-3/4 border-2 border-white">
										{targetUser?.likedPostsIds.length >
										0 ? (
											targetUser?.likedPostsIds.map(
												(id) => (
													<>
														<div className="p-2 m-2 text-white text-2xl border-2 rounded">
															{id}
														</div>
													</>
												)
											)
										) : (
											<>
												<h2 className="flex justify-center items-center text-xl text-slate-500">
													This user has no liked
													videos.
												</h2>
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
