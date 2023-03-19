import { FunctionComponent } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../apollo-client";
import ReactPlayer from "react-player";

interface IPublisher {
	username: string;
}

interface IPost {
	videoKey: string;
	title: string;
	description?: string;
	category?: string;
	publisher: IPublisher;
	likes: number;
	views: number;
}
interface Props {
	posts: IPost[];
}

const Home: FunctionComponent<Props> = ({ posts }) => {
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-start space-y-10 font-mono pt-40">
				<h1 className="text-4xl font-medium text-slate-100">Home</h1>
				<div className="grid grid-cols-4 gap-10">
					{posts &&
						posts.map((post: IPost, key) => (
							<div
								key={key}
								className="hover:bg-gray-600 p-2 hover:cursor-pointer rounded-lg"
							>
								<div className="border-2 border-white rounded">
									<ReactPlayer
										url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
										width="100%"
										height="150px"
									/>
								</div>

								<h1 className="text-white text-2xl bold">
									{post.title}
								</h1>
								<p className="text-white text-xl ">
									{post.publisher.username}
								</p>
							</div>
						))}
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
