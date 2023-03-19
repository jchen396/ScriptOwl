import { GET_POST_BY_ID } from "@/graphql/queries/getPostById";
import { FunctionComponent, useState, useEffect } from "react";
import React from "react";
import client from "../../../apollo-client";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { COMMENT_POST } from "@/graphql/mutations/commentPost";
import { useMutation } from "@apollo/client";
import Image from "next/image";

interface IUser {
	username: string;
	password: string;
	id: string;
	email: string;
	avatarKey: string;
}

interface IPublisher {
	username: string;
}

interface IComment {
	commenter: IUser;
	comment: string;
	timestamp: string;
	likes: number;
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
	comments: IComment[];
}
interface Props {
	post: IPost;
}

const Watch: FunctionComponent<Props> = ({ post }) => {
	const [comment, setComment] = useState<string>();
	const [commentPost] = useMutation(COMMENT_POST);
	const { currentUser } = useSelector((state: any) => state.user);
	const onCommentHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		commentPost({
			variables: {
				postId: post.id,
				commenter: currentUser.id,
				comment,
			},
		});
	};
	return (
		<div className="h-screen w-screen flex flex-row items-center justify-start space-y-10 font-mono p-6 pt-20 ">
			<div className="basis-2/3 w-full h-full flex justify-center items-center">
				<ReactPlayer
					url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
					width="90%"
					height="auto"
					controls={true}
				/>
			</div>
			<div className="basis-1/3 h-full w-full flex flex-col justify-center items-center text-white space-y-4">
				<h2 className="text-2xl">{post.comments.length} Comments</h2>
				<div className="h-3/4 w-full flex flex-col space-y-4">
					<div className="basis-4/5 text-white border-2 bg-transparent border-gray-800 rounded-lg overflow-auto">
						{post.comments ? (
							post.comments.map((comment, key) => (
								<div key={key}>
									<div className="flex flex-row justify-start items-center p-2 space-x-4">
										<Image
											height={32}
											width={32}
											className="w-8 h-8 rounded-full"
											src={`http://localhost:8080/images/${comment.commenter.avatarKey}`}
											alt="commenter photo"
										/>
										<div className="flex flex-col text-gray-600">
											<p className="text-xl">
												{comment.commenter.username}
											</p>
											<p>{comment.comment}</p>
											<p className="text-sm">
												Likes: {comment.likes}
											</p>
										</div>
									</div>
									<hr className="border-gray-800 opacity-75" />
								</div>
							))
						) : (
							<div className="w-full h-full flex justify-center items-center text-gray-600">
								<p>No comments yet</p>
							</div>
						)}
					</div>
					<div className="basis-auto w-full flex flex-row justify-center items-center space-x-2">
						<input
							type="text"
							placeholder="Add a comment..."
							className="w-full h-auto p-2 bg-transparent border-gray-800 border-b-2 "
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							className="border-2 border-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded-full "
							onClick={(e) => onCommentHandler(e)}
						>
							Comment
						</button>
					</div>
				</div>
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
