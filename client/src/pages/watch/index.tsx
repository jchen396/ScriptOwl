import { GET_POST_BY_ID } from "@/graphql/queries/getPostById";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import React from "react";
import client from "../../../apollo-client";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { COMMENT_POST } from "@/graphql/mutations/commentPost";
import { useMutation } from "@apollo/client";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Image from "next/image";
import { getTimeDiff } from "@/functions/getTimeDiff";
import { useRouter } from "next/router";
import { INCREMENT_VIEW_COUNT } from "@/graphql/mutations/incrementViewCount";
import { IPost } from "@/types/types";

interface Props {
	post: IPost;
}

const Watch: FunctionComponent<Props> = ({ post }) => {
	const [isSSR, setIsSSR] = useState(true);
	const router = useRouter();
	const [commentPost] = useMutation(COMMENT_POST);
	const [incrementViewCount] = useMutation(INCREMENT_VIEW_COUNT);
	const { currentUser } = useSelector((state: any) => state.user);
	const { timeNumber, timeWord } = getTimeDiff(parseInt(post.createdAt.date));
	const refreshData = async () => {
		router.replace(router.asPath);
	};
	const onCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const comment = e.currentTarget.comment.value;
		e.currentTarget.comment.value = "";
		const { data } = await commentPost({
			variables: {
				postId: post.id,
				commenter: currentUser.id,
				comment,
			},
		});
		post = data.commentPost;
		refreshData();
	};
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return (
		<>
			{!isSSR && (
				<div className="h-screen w-screen flex flex-row items-center justify-start space-y-10 font-mono p-6 pt-20 ">
					<div className="basis-2/3 w-full h-full flex justify-center items-center">
						<div className="flex flex-col justify-center items-center space-y-2">
							<ReactPlayer
								url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
								width="90%"
								height="auto"
								controls={true}
							/>
							<div className="w-[90%] flex flex-row justify-start items-center space-x-4 text-white text-2xl">
								<p>{post.views} views</p>
								<span>&middot;</span>
								<p>
									{timeNumber} {timeWord} ago
								</p>
							</div>
						</div>
					</div>
					<div className="basis-1/3 h-full w-full flex flex-col justify-center items-center text-white space-y-4">
						<h2 className="text-2xl">
							{post.comments.length} Comments
						</h2>
						<div className="h-4/5 w-full flex flex-col space-y-4">
							<div className="basis-4/5 text-white border-2 bg-transparent border-gray-800 rounded-lg overflow-auto">
								{post.comments.length ? (
									post.comments
										.slice(0)
										.reverse()
										.map((comment, key) => {
											// convert time difference between current time and time when comment was posted
											const { timeNumber, timeWord } =
												getTimeDiff(
													parseInt(
														comment.createdAt.date
													)
												);
											return (
												<div key={key}>
													<div className="flex flex-row justify-start items-center p-2 space-x-4">
														<Image
															height={32}
															width={32}
															className="w-10 h-10 rounded-full"
															src={`http://localhost:8080/images/${comment.commenter.avatarKey}`}
															alt="commenter photo"
														/>
														<div className="flex flex-col text-gray-400">
															<div className="flex flex-row items-center space-x-2">
																<h2 className="text-xl hover:underline hover:text-white hover:cursor-pointer">
																	{
																		comment
																			.commenter
																			.username
																	}
																</h2>
																{timeNumber &&
																timeWord ? (
																	<p className="text-gray-600">
																		{
																			timeNumber
																		}{" "}
																		{
																			timeWord
																		}{" "}
																		ago
																	</p>
																) : (
																	<p className="text-gray-600">
																		Just now
																	</p>
																)}
															</div>

															<p>
																{
																	comment.comment
																}
															</p>
															<div className="text-sm flex flex-row items-center space-x-2">
																<ThumbUpOffAltIcon className="hover:text-white hover:cursor-pointer" />
																<p>
																	{
																		comment.likes
																	}
																</p>
															</div>
														</div>
													</div>
													<hr className="border-gray-800 opacity-75" />
												</div>
											);
										})
								) : (
									<div className="w-full h-full flex justify-center items-center text-gray-600">
										<p>No comments yet</p>
									</div>
								)}
							</div>
							<form
								onSubmit={(e) => onCommentHandler(e)}
								className="basis-auto w-full flex flex-row justify-center items-center space-x-2"
							>
								<input
									type="text"
									id="comment"
									name="comment"
									placeholder="Add a comment..."
									className="w-full h-auto p-2 bg-transparent border-gray-800 border-b-2 "
								/>
								<button
									className="border-2 border-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded-full "
									type="submit"
								>
									Comment
								</button>
							</form>
						</div>
					</div>
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
