import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

interface Props {}

async function postImage({ image }: { image: any }) {
	const formData = new FormData();
	formData.append("image", image);
	const result = await axios
		.post("http://localhost:8080/images", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then((data) => data);
	return result.data;
}

const Account: FunctionComponent<Props> = () => {
	const [image, setImage] = useState<any>();
	const [editToggle, setEditToggle] = useState<boolean>(false);
	const router = useRouter();
	const { currentUser } = useSelector((state: any) => state.user);
	const data = router.query;
	if (!currentUser || data.id !== currentUser.id) {
		try {
			location.replace("/");
		} catch (err) {
			console.log(err);
		}
	}
	const onEditToggle = () => {
		setEditToggle(!editToggle);
	};
	const onFileSelected = async (e: any) => {
		const targetFile = e.target.files[0];
		const result = await postImage({ image: targetFile });
		setImage(result.imagePath);
	};
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono">
				<h1 className="text-4xl font-medium text-slate-100">Account</h1>
				<div className="flex flex-col space-y-4 border-t-2 border-slate-100 bg-transparent text-slate-100 w-2/3 h-2/3 md:py-20 md:px-0">
					<div className="w-full h-full flex flex-col justify-between items-center md:flex-row space-y-10">
						<div className="h-full flex flex-col justify-between items-center basis-1/2 space-y-10">
							<div className="flex flex-col space-y-4 justify-center items-center">
								<p className="text-xl">Profile picture</p>
								<Image
									height={32}
									width={32}
									className="w-32 h-32 rounded-full"
									src={`http://localhost:8080${image}`}
									alt="user photo"
								/>
								<div className="flex flex-col items-center p-4 bg">
									<button
										onClick={onEditToggle}
										className="p-1 px-2 space-x-1 bg-slate-800 rounded-lg flex flex-row items-center hover:bg-slate-500"
									>
										<EditIcon />
										<span>Edit</span>
									</button>
									<div
										className={`flex flex-col items-center ${
											editToggle ? "block" : "hidden"
										} `}
									>
										<div className="w-20 overflow-hidden inline-block">
											<div className=" h-5 w-5 bg-gray-700 rotate-45 transform origin-bottom-left"></div>
										</div>
										<ul className="flex flex-col justify-center items-start bg-gray-700 rounded-sm ">
											<input
												onChange={(e) =>
													onFileSelected(e)
												}
												type="file"
												className="hidden"
												id="contained-button-file"
											/>
											<label
												htmlFor="contained-button-file"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 hover:cursor-pointer rounded w-full"
											>
												Upload a photo...
											</label>
											<li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 hover:cursor-pointer rounded w-full">
												Remove photo
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="basis-1/2">
							<form
								className="flex flex-col space-y-4 items-center"
								action=""
							>
								<label
									className="text-white"
									htmlFor="username"
								>
									Username
								</label>
								<input
									type="text"
									id="disabled-input"
									aria-label="disabled input"
									className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-not-allowed dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={`${data.username}`}
									disabled
								></input>
								<label className="text-white" htmlFor="email">
									E-mail
								</label>
								<input
									type="text"
									id="disabled-input"
									aria-label="disabled input"
									className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-not-allowed dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={`${data.email}`}
									disabled
								></input>
								<label
									className="text-white"
									htmlFor="username"
								>
									Password
								</label>
								<input
									type="text"
									id="disabled-input"
									aria-label="disabled input"
									className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-not-allowed dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={`Test`}
									disabled
								></input>
								<label
									className="text-white"
									htmlFor="username"
								>
									Confirm Password
								</label>
								<input
									type="text"
									id="disabled-input"
									aria-label="disabled input"
									className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-not-allowed dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={`Test2`}
									disabled
								></input>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
