import React, { useState } from "react";
import client from "../../../apollo-client";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import { InferGetServerSidePropsType, NextPage } from "next";
import VideoGrid from "@/components/Explore/VideoGrid";

const Uploads: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
	const [showDeleteMsg, setShowDeleteMsg] = useState<boolean>(true);
	return (
		<>
			<div className="w-full h-full bg-black flex flex-col justify-center items-center text-white space-y-10 py-10">
				{showDeleteMsg && (
					<div className="absolute flex flex-col justify-center items-center p-4 rounded-lg text-white border-2 border-white bg-black z-50">
						<p className="m-2">
							Are you sure you want to delete this?
						</p>
						<div className="w-full flex flex-row justify-around items-center ">
							<button className="bg-red-400 hover:bg-opacity-80 p-2 px-4 rounded ">
								Yes
							</button>
							<button onClick={() => setShowDeleteMsg(false)}>
								Cancel
							</button>
						</div>
					</div>
				)}
				<h1 className="text-4xl font-medium text-slate-100">Uploads</h1>
				<div className="w-3/4 h-3/5 rounded ">
					{data.userPosts.length !== 0 ? (
						<div className="h-full w-full flex items-center justify-start font-mono p-4 overflow-y-auto">
							<VideoGrid
								posts={data.userPosts}
								options={["delete", "edit"]}
								setShowDeleteMsg={setShowDeleteMsg}
							/>
						</div>
					) : (
						<div className="w-full h-full flex justify-center items-center py-10">
							<p className="text-gray-700">No post uploaded</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { data } = await client.query({
		query: USER_POSTS,
		variables: {
			postIds: context.query.postIds,
		},
		fetchPolicy: "no-cache",
	});
	return {
		props: { data },
	};
}

export default Uploads;
