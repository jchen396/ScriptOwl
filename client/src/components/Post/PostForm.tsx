import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IUser } from "../../../../types/types";

interface Props {
	onSubmitHandler: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
	posted: boolean;
	setVideoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
	setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
	setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
	setCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
	loading: boolean;
	successMessage: string;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
	errorMessage: string;
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
	currentUser: IUser;
}

const PostForm: React.FC<Props> = ({
	onSubmitHandler,
	posted,
	setVideoFile,
	setTitle,
	setDescription,
	setCategory,
	loading,
	successMessage,
	setSuccessMessage,
	errorMessage,
	setErrorMessage,
	currentUser,
}) => {
	return (
		<div className="min-h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
			<h1 className="text-4xl font-medium text-slate-100">
				Post a video
			</h1>
			<form className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16">
				<p className="text-red-400 text-sm">
					This service is currently unavailable. Sorry for the
					inconvenience!
				</p>
				{successMessage && (
					<div className="bg-green-500 p-4 rounded flex flex-row justify-between items-center space-x-2">
						<CheckCircleIcon className="text-green-900" />
						<span className="text-black ">
							Uploaded successfully!
						</span>
						<CloseIcon
							className="hover:cursor-pointer text-green-900"
							onClick={() => setSuccessMessage("")}
						/>
					</div>
				)}
				{errorMessage && (
					<div className="w-full flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4 space-x-2">
						<ErrorIcon />
						<p>{errorMessage}</p>
						<CloseIcon
							className="hover:cursor-pointer"
							onClick={() => setErrorMessage("")}
						/>
					</div>
				)}
				<p className="text-gray-700 self-center">
					Make sure the video file is in .mp4 format
				</p>
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
					className={`text-white bg-gray-700 hover:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
						${
							currentUser.isVerified
								? `${
										loading || posted
											? "hover:cursor-not-allowed bg-blue-700"
											: ""
								  } 
								`
								: "border-gray-600 bg-gray-600 hover:cursor-not-allowed"
						} `}
					//disabled={loading || !currentUser.isVerified}
					disabled={true}
					//onClick={(e) => onSubmitHandler(e)}
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
	);
};

export default PostForm;
