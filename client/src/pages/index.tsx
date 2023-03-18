import { FunctionComponent } from "react";
import { GET_POSTS } from "@/graphql/queries/getPosts";
import client from "../../apollo-client";

interface IPublisher {
	id: string;
}

interface IPost {
	videoKey: string;
	title: string;
	description?: string;
	category?: string;
	publisher: IPublisher;
	likes: number;
}
interface Props {
	posts: IPost[];
}

const Home: FunctionComponent<Props> = ({ posts }) => {
	console.log(process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN);
	return (
		<>
			<div className="flex justify-center items-center text-white w-full h-full">
				{posts &&
					posts.map((post: IPost, key) => (
						<div
							className="p-4 text-white border-2 border-white"
							key={key}
						>
							<p>{post.title}</p>
							<p>{post.publisher.id}</p>
							<p>{post.description}</p>
							<p>{post.category}</p>
						</div>
					))}
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
