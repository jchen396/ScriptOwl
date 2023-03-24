import { FunctionComponent, useEffect, useState } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../apollo-client";
import Link from "next/link";
import { getTimeDiff } from "@/functions/getTimeDiff";
import { INCREMENT_VIEW_COUNT } from "@/graphql/mutations/incrementViewCount";
import { useMutation } from "@apollo/client";
import VideoGrid from "@/components/Home/VideoGrid";
import { IPost } from "../../../types/types";

interface Props {
	posts: IPost[];
}

const Home: FunctionComponent<Props> = ({ posts }) => {
	const [isSSR, setIsSSR] = useState(true);
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return (
		<>
			{!isSSR && (
				<div className="h-screen w-screen flex flex-col items-center justify-start space-y-10 font-mono pt-40">
					<VideoGrid posts={posts} />
				</div>
			)}
		</>
	);
};

export async function getServerSideProps() {
	const { data } = await client.query({ query: GET_POSTS });
	return {
		props: { posts: data.posts },
	};
}

export default Home;
