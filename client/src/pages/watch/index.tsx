import { GET_POST_BY_ID } from "@/graphql/queries/getPostById";
import { FunctionComponent } from "react";
import React from "react";
import client from "../../../apollo-client";
import ReactPlayer from "react-player";

interface IPublisher {
	username: string;
}

interface IPost {
	id: string;
	videoKey: string;
	title: string;
	description?: string;
	category?: string;
	publisher: IPublisher;
	likes: number;
	views: number;
}
interface Props {
	post: IPost;
}

const Watch: FunctionComponent<Props> = ({ post }) => {
	return (
		<div className="h-screen w-screen flex flex-row items-center justify-start space-y-10 font-mono pt-20 ">
			<div className="basis-2/3 w-full h-full flex justify-center items-center">
				<ReactPlayer
					url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
					width="90%"
					height="auto"
					controls={true}
				/>
			</div>

			<div className="basis-1/3 flex justify-center items-center text-white">
				Comments
			</div>
		</div>
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
