import React from "react";
import client from "../../../apollo-client";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import { InferGetServerSidePropsType, NextPage } from "next";
import VideoGrid from "@/components/Explore/VideoGrid";

const Uploads: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
	return (
		<>
			<div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white space-y-10">
				<h1 className="text-4xl font-medium text-slate-100">Uploads</h1>
				<div className="border-2 border-gray-700 w-3/4 h-3/5 rounded overflow-scroll-y ">
					{data.userPosts ? (
						<div className="h-full w-full flex items-center justify-start font-mono p-4 overflow-y-scroll ">
							<VideoGrid posts={data.userPosts} />
						</div>
					) : (
						<div className="w-full h-full flex justify-center items-center">
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
