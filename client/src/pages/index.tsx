import { FunctionComponent } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../apollo-client";
import ReactPlayer from "react-player";
import Link from "next/link";
import { getTimeDiff } from "@/functions/getTimeDiff";

interface IDate {
	date: string;
}

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
	comments: object[];
	createdAt: IDate;
}
interface Props {
	posts: IPost[];
}

const Home: FunctionComponent<Props> = ({ posts }) => {
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-start space-y-10 font-mono pt-40">
				<h1 className="text-4xl font-medium text-slate-100">Home</h1>
				<div className="grid grid-cols-5 gap-4">
					{posts &&
						posts.map((post: IPost, key) => {
							const { timeNumber, timeWord } = getTimeDiff(
								parseInt(post.createdAt.date)
							);
							return (
								<div
									key={key}
									className="hover:bg-gray-800 p-2 hover:cursor-pointer rounded-lg"
								>
									<Link
										href={{
											pathname: "/watch",
											query: { v: post.id },
										}}
									>
										<div className="border-2 border-gray-800 rounded">
											<ReactPlayer
												url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
												width="100%"
												height="150px"
											/>
										</div>

										<p className="text-white text-xl bold">
											{post.title}
										</p>
										<p className="text-gray-400 text-lg">
											{post.publisher.username}
										</p>
										<div className="flex flex-row justify-start items-center text-gray-400 text-sm space-x-2">
											<p>{post.views} views</p>
											<span className="text-md">
												&middot;
											</span>
											<p className="">
												{timeNumber} {timeWord} ago
											</p>
										</div>
									</Link>
								</div>
							);
						})}
				</div>
			</div>
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
