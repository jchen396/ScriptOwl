import { ADD_POST } from "@/graphql/mutations/addPost";
import { useMutation } from "@apollo/client";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { postVideo } from "@/functions/s3functions/postVideo";

type Props = {};

const Post: FunctionComponent<Props> = () => {
	const router = useRouter();
	const [posted, setPosted] = useState<boolean>(false);
	const [videoFile, setVideoFile] = useState<File>();
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [category, setCategory] = useState<string>();
	const [addPost, { loading }] = useMutation(ADD_POST);
	const [success, setSuccess] = useState<boolean>();
	const { currentUser } = useSelector((state: any) => state.user);
	if (!currentUser) {
		router.push("/login");
	}
	const onSubmitHandler = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setPosted(true);
		let result;
		if (videoFile) {
			result = await postVideo({ videoFile });
		} else {
			console.log("No file selected...");
			return;
		}
		await addPost({
			variables: {
				videoKey: result.key,
				title,
				description,
				category,
				publisher: currentUser.id,
			},
		});
		setSuccess(true);
		setPosted(false);
	};
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono">
				<h1 className="text-4xl font-medium text-slate-100">
					Post a video
				</h1>
				<form className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16">
					{success && (
						<div className="bg-green-500 p-4 rounded flex flex-row justify-start items-center space-x-2">
							<CheckCircleIcon className="text-green-900" />
							<span className="text-black ">
								Uploaded successfully!
							</span>
						</div>
					)}
					<div>
						<label
							htmlFor="video"
							className="block mb-2 text-sm text-gray-900 dark:text-white"
						>
							Upload
						</label>
						<input
							onChange={(e) => {
								if (!e.target.files) return;
								setVideoFile(e.target.files[0]);
							}}
							type="file"
							className="w-full"
						/>
					</div>
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
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="last_name"
							className="block mb-2 text-sm text-gray-900 dark:text-white"
						>
							Description
						</label>
						<textarea
							id="description"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							onChange={(e) => setDescription(e.target.value)}
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
							onChange={(e) => setCategory(e.target.value)}
							defaultValue="DEFAULT"
						>
							<option value="DEFAULT" disabled>
								Choose a category...
							</option>
							<option value="entertainment">Entertainment</option>
							<option value="music">Music</option>
							<option value="education">Education</option>
							<option value="sports">Sports</option>
							<option value="comedy">Comedy</option>
						</select>
					</div>
					<button
						type="button"
						className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-700 ${
							loading || posted
								? "hover:cursor-not-allowed bg-blue-700"
								: "hover:cursor-pointer"
						} `}
						disabled={loading}
						onClick={(e) => onSubmitHandler(e)}
					>
						{loading || posted ? (
							<div className="w-full flex flex-row justify-center items-center space-x-4">
								<div role="status">
									<div
										className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
										role="status"
									>
										<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
											Loading...
										</span>
									</div>
									<span className="sr-only">Loading...</span>
								</div>
								<span>Posting...</span>
							</div>
						) : (
							<span>Post</span>
						)}
					</button>
				</form>
			</div>
		</>
	);
};

export default Post;
