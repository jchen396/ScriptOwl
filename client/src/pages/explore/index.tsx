import { FunctionComponent, useEffect, useState } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../../apollo-client";
import VideoGrid from "@/components/Explore/VideoGrid";
import { IPost } from "../../../../types/types";
import PaginationBar from "@/components/Explore/PaginationBar";
import { getPageCount } from "@/functions/getPageCount";
import Head from "next/head";

interface Props {
	posts: IPost[];
	pageCount: number;
	currentPage: string;
}

const Home: FunctionComponent<Props> = ({ posts, pageCount, currentPage }) => {
	const [isSSR, setIsSSR] = useState<boolean>(true);
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return posts && posts.length !== 0 ? (
		<>
			<Head>
				<title>ScriptOwl | Explore</title>
				<meta
					name="description"
					content="ScriptOwl is a video streaming site is dedicated to revolutionizing the way people learn and consume media content. By harnessing the power of GPT 3.5, we provide users with real-time translation of video transcripts, as well as a summarization feature that saves time and makes information more digestible. In addition, our quiz creation feature allows users to test their knowledge and reinforce what they've learned. Our goal is to break down language barriers and make learning more accessible to everyone, and we're constantly striving to innovate and improve the user experience. Join us on our mission to bring the world closer together through the power of video."
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					property="og:title"
					content="
					ScriptOwl | Explore
				"
					key="title"
				/>
				<link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
			</Head>
			{!isSSR && (
				<div className="h-full w-full flex flex-col items-center justify-start space-y-10 font-mono py-10">
					<h1 className="text-4xl font-medium text-slate-100 self-center">
						Explore
					</h1>
					<VideoGrid posts={posts} />
					<PaginationBar
						pageCount={pageCount}
						currentPage={currentPage}
					/>
				</div>
			)}{" "}
		</>
	) : (
		<>
			<div className="h-full w-full flex flex-col items-center justify-start space-y-10 font-mono py-10 text-white ">
				<h1 className="text-4xl font-medium text-slate-100 self-center">
					Explore
				</h1>
				<p className="h-full flex justify-center items-center text-gray-700">
					No videos found
				</p>
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	// get page number
	const currentPage = context.query.page ? context.query.page : 1;
	const { data } = await client.query({
		query: GET_POSTS,
		variables: {
			page: parseInt(currentPage),
		},
	});
	const pageCount = await getPageCount();
	return {
		props: { posts: data.posts, pageCount, currentPage },
	};
}

export default Home;
