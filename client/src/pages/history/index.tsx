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
				<h1 className="text-4xl font-medium text-slate-100">
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
						<div className="h-full w-full flex items-center justify-start font-mono p-4 overflow-y-auto"></div>
					) : (
						<div className="w-full h-full flex justify-center items-center py-10">
							<p className="text-gray-700">No watch history</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default History;
