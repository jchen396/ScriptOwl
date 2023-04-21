import { FunctionComponent, useEffect, useState } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../../apollo-client";
import VideoGrid from "@/components/Explore/VideoGrid";
import { IPost } from "../../../../types/types";
import PaginationBar from "@/components/Explore/PaginationBar";
import { getPageCount } from "@/functions/getPageCount";

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
	console.log(posts);
	return posts && posts.length !== 0 ? (
		<>
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
