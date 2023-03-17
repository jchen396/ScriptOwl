import { ADD_POST } from "@/graphql/mutations/addPost";
import { useMutation } from "@apollo/client";
import { FormEvent, FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Post: FunctionComponent<Props> = () => {
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [category, setCategory] = useState<string>();
	const [addPost, { data }] = useMutation(ADD_POST);
	const { currentUser } = useSelector((state: any) => state.user);
	if (!currentUser) {
		location.replace("/login");
	}
	const onSubmitHandler = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		addPost({
			variables: {
				videoKey: "testVideoKey",
				title,
				description,
				category,
				publisher: currentUser.id,
				likes: 0,
			},
		});
	};
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono">
				<h1 className="text-4xl font-medium text-slate-100">
					Post a video
				</h1>
				<form className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16">
					<div>
						<label
							htmlFor="video"
							className="block mb-2 text-sm text-gray-900 dark:text-white"
						>
							Upload
						</label>
						<input type="file" className="w-full" />
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
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={(e) => onSubmitHandler(e)}
					>
						Post
					</button>
				</form>
			</div>
		</>
	);
};

export default Post;
