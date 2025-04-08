import React, { useState } from "react";
import client from "../../../apollo-client";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import { InferGetServerSidePropsType, NextPage } from "next";
import VideoGrid from "@/components/Explore/VideoGrid";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "@/graphql/mutations/deletePost";
import { UPDATE_POST } from "@/graphql/mutations/updatePost";

const Uploads: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
	const [showDeleteMsg, setShowDeleteMsg] = useState<boolean>(false);
	const [showEditMsg, setShowEditMsg] = useState<boolean>(false);
	const [targetPostId, setTargetPostId] = useState<string>("");
	const [targetPostPublisherId, setTargetPostPublisherId] =
		useState<string>("");
	const [targetPostTitle, setTargetPostTitle] = useState<string>("");
	const [targetPostDesc, setTargetPostDesc] = useState<string | undefined>(
		""
	);
	const [targetPostCategory, setTargetPostCategory] = useState<
		string | undefined
	>("");
	const [deletePost] = useMutation(DELETE_POST);
	const [updatePost] = useMutation(UPDATE_POST);

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string | null>("");
	const [category, setCategory] = useState<string | null>("");

	const onDeletePost = async () => {
		await deletePost({
			variables: {
				publisherId: targetPostPublisherId,
				postId: targetPostId,
			},
		});
	};
	const onEditPost = async () => {
		await updatePost({
			variables: {
				publisherId: targetPostPublisherId,
				postId: targetPostId,
				title,
				description,
				category,
			},
		});
	};
	return (
		<>
			<div className="w-full h-full bg-black flex flex-col justify-center items-center text-white space-y-10 py-10">
				{showDeleteMsg && (
					<div className="absolute flex flex-col justify-center items-center p-4 rounded-lg text-white border-2 border-white bg-black z-50">
						<p className="m-2">
							{`Are you sure you want to delete '${targetPostTitle}' ?`}
						</p>
						<div className="w-full flex flex-row justify-around items-center ">
							<button
								onClick={() => {
									onDeletePost();
								}}
								className="bg-red-400 hover:bg-opacity-80 p-2 px-4 rounded "
							>
								Yes
							</button>
							<button onClick={() => setShowDeleteMsg(false)}>
								Cancel
							</button>
						</div>
					</div>
				)}
				{showEditMsg && (
					<div className="absolute flex flex-col justify-center items-center p-4 rounded-lg text-white border-2 border-white bg-black z-50">
						<form action="">
							<div>
								<label
									htmlFor="first_name"
									className="block mb-2 text-sm text-gray-900 dark:text-white"
								>
									Title
								</label>
								<input
									type="text"
									id="title"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder={targetPostTitle}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="description"
									className="block mb-2 text-sm text-gray-900 dark:text-white"
								>
									Description
								</label>
								<textarea
									id="description"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder={targetPostDesc}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</div>
							<div className="mb-6">
								<label
									htmlFor="categories"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Category
								</label>
								<select
									id="categories"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									onChange={(e) =>
										setCategory(e.target.value)
									}
									defaultValue="DEFAULT"
								>
									<option value="DEFAULT" disabled>
										Choose a category...
									</option>
									<option value="entertainment">
										Entertainment
									</option>
									<option value="music">Music</option>
									<option value="education">Education</option>
									<option value="sports">Sports</option>
									<option value="comedy">Comedy</option>
								</select>
							</div>
						</form>
						<div className="w-full flex flex-row justify-around items-center ">
							<button
								onClick={() => onEditPost()}
								className="bg-blue-400 hover:bg-opacity-80 p-2 px-4 rounded "
							>
								Confirm
							</button>
							<button onClick={() => setShowEditMsg(false)}>
								Close
							</button>
						</div>
					</div>
				)}
				<h1 className="text-4xl font-medium text-slate-100">Uploads</h1>
				<div className="w-3/4 h-3/5 rounded ">
					{data.userPosts.length !== 0 ? (
						<div className="h-full w-full flex items-center justify-start font-mono p-4 overflow-y-auto">
							<VideoGrid
								posts={data.userPosts}
								options={["delete", "edit"]}
								setShowDeleteMsg={setShowDeleteMsg}
								setShowEditMsg={setShowEditMsg}
								setTargetPostId={setTargetPostId}
								setTargetPostPublisherId={
									setTargetPostPublisherId
								}
								setTargetPostTitle={setTargetPostTitle}
								setTargetPostDesc={setTargetPostDesc}
								setTargetPostCategory={setTargetPostCategory}
							/>
						</div>
					) : (
						<div className="w-full h-full flex justify-center items-center py-10">
							<p className="text-gray-700">No post uploaded</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { data } = await client.query({
		query: USER_POSTS,
		variables: {
			postIds: context.query.postIds,
		},
		fetchPolicy: "no-cache",
	});
	return {
		props: { data },
	};
}

export default Uploads;
