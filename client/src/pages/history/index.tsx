import React from "react";
import client from "../../../apollo-client";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import { InferGetServerSidePropsType, NextPage } from "next";
import VideoGrid from "@/components/Explore/VideoGrid";

const Histoy: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
	return (
		<>
			<div className="w-full h-full bg-black flex flex-col justify-center items-center text-white space-y-10 py-10">
				<h1 className="text-4xl font-medium text-slate-100">
					Watch History
				</h1>
				<div className="w-3/4 h-3/5 rounded ">
					{data.userPosts.length !== 0 ? (
						<div className="h-full w-full flex items-center justify-start font-mono p-4 overflow-y-auto">
							<VideoGrid posts={data.userPosts} />
						</div>
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

export default Histoy;
