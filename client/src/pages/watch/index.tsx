import { GET_POST_BY_ID } from "@/graphql/queries/getPostById";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import React from "react";
import client from "../../../apollo-client";
import { useSelector } from "react-redux";
import { getTimeDiff } from "@/functions/getTimeDiff";
import VideoSection from "@/components/Watch/VideoSection";
import CommentSection from "@/components/Watch/CommentSection";
import { IPost } from "../../../../types/types";

interface Props {
	post: IPost;
}

const Watch: FunctionComponent<Props> = ({ post }) => {
	const [isSSR, setIsSSR] = useState(true);
	const { currentUser } = useSelector((state: any) => state.user);
	const { timeNumber, timeWord } = getTimeDiff(parseInt(post.createdAt.date));
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return (
		<>
			{!isSSR && (
				<div className="h-screen w-screen flex flex-row items-center justify-start space-y-10 font-mono p-6 pt-20 ">
					<VideoSection
						post={post}
						timeNumber={timeNumber}
						timeWord={timeWord}
					/>
					<CommentSection post={post} currentUser={currentUser} />
				</div>
			)}
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { data } = await client.query({
		query: GET_POST_BY_ID,
		variables: {
			id: context.query.v,
		},
	});
	return {
		props: { post: data.post },
	};
}

export default Watch;
