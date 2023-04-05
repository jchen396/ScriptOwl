import { FunctionComponent, useEffect, useState } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../apollo-client";
import VideoGrid from "@/components/Home/VideoGrid";
import { IPost } from "../../../types/types";
import PaginationBar from "@/components/Home/PaginationBar";

interface Props {
	posts: IPost[];
}

const Home: FunctionComponent<Props> = ({ posts }) => {
	const [isSSR, setIsSSR] = useState<boolean>(true);
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return posts ? (
		<>
			{!isSSR && (
				<div className="h-screen w-screen flex flex-col items-center justify-start space-y-10 font-mono pt-40 overflow-y-scroll">
					<VideoGrid posts={posts} />
					<PaginationBar />
				</div>
			)}{" "}
		</>
	) : (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-start space-y-10 font-mono pt-40 text-white">
				<p>No videos found</p>
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	// get page number
	const page = context.query.page ? context.query.page : 1;
	const { data } = await client.query({
		query: GET_POSTS,
		variables: {
			page: parseInt(page),
		},
	});
	return {
		props: { posts: data.posts },
	};
}

export default Home;
