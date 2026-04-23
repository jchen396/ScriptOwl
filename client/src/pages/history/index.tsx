import React, { FunctionComponent, useEffect, useState } from "react";
import client from "../../../apollo-client";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import VideoGrid from "@/components/Explore/VideoGrid";
import { useSelector } from "react-redux";
import { WatchedPost, IPost } from "./../../../../types/types";

interface Props {}
const History: FunctionComponent<Props> = () => {
	const { currentUser } = useSelector((state: any) => state.user);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		client
			.query({
				query: USER_POSTS,
				variables: {
					postIds: currentUser?.watchHistory?.map(
						(obj: WatchedPost) => obj.postId
					),
				},
			})
			.then((res: any) => {
				setPosts(res.data.userPosts);
				setLoading(false);
			});
	}, [currentUser]);
	return (
		<>
			<div className="w-full h-full bg-black flex flex-col justify-center items-center text-white space-y-10 py-10">
				<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">
					Watch History
				</h1>
				{loading ? (
					<>
						<span>Loading history...</span>
					</>
				) : (
					<VideoGrid posts={posts} />
				)}
				<div className="w-3/4 h-3/5 rounded ">
					{currentUser?.watchHistory?.length !== 0 ? (
						<div className="flex items-center justify-start p-4 overflow-y-auto text-white font-sans w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
					) : (
						<div className="w-full h-full flex justify-center items-center py-10">
							<div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-xl">
								<p className="text-gray-300 text-lg font-light">No watch history</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default History;
