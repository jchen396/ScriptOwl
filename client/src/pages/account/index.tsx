import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { updateUser } from "@/redux/apiCalls";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/updateUser";

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
	const dispatch = useDispatch();
	const [newPassword, setNewPassword] = useState<string>();
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>();
	const [imageKey, setImageKey] = useState<any>();
	const [editToggle, setEditToggle] = useState<boolean>(false);
	const router = useRouter();
	const { currentUser } = useSelector((state: any) => state.user);
	const userData = router.query;
	const [userUpdateMutate, { data }] = useMutation(UPDATE_USER);
	if (!currentUser || userData.username !== currentUser.username) {
		try {
			location.replace("/");
		} catch (err) {
			console.log(err);
		}
	}
	const onEditToggle = () => {
		setEditToggle(!editToggle);
	};
	const onResetPhoto = () => {
		setImageKey(null);
	};
	const onFileSelected = async (e: any) => {
		const targetFile = e.target.files[0];
		const result = await postImage({ image: targetFile });
		setImageKey(result.key);
	};
	const onSaveChanges = async () => {
		try {
			if (newPassword !== confirmNewPassword) {
				throw new Error("Passwords do not match.");
			}
			const id = currentUser.id;
			await userUpdateMutate({
				variables: {
					id: id,
					avatarKey: imageKey,
					password: newPassword,
				},
			});
			updateUser(dispatch, data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono">
				<h1 className="text-4xl font-medium text-slate-100">Account</h1>
				<div className="flex flex-col space-y-4 border-2 border-slate-100 bg-transparent text-slate-100 w-2/3 h-2/3 md:py-20 md:px-0">
					<div className="w-full h-full flex flex-col justify-between items-center md:flex-row space-y-10">
						<div className="h-full flex flex-col justify-between items-center basis-1/2 space-y-10">
							<div className="flex flex-col space-y-4 justify-center items-center">
								<p className="text-xl">Profile picture</p>
								{imageKey ? (
									<Image
										height={32}
										width={32}
										className="w-32 h-32 rounded-full"
										src={`http://localhost:8080/images/${imageKey}`}
										alt="user photo"
									/>
								) : (
									<Image
										height={32}
										width={32}
										className="w-32 h-32 rounded-full"
										src={`http://localhost:8080/images/${currentUser.avatarKey}`}
										alt="user photo"
									/>
								)}
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
											<li
												onClick={onResetPhoto}
												className={`block px-4 py-2 text-sm text-gray-700 rounded w-full ${
													imageKey
														? "hover:cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600  "
														: "dark:text-gray-400 hover:cursor-not-allowed"
												}`}
											>
												Reset photo
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col items-center ">
								<p className="text-2xl">
									Points: {currentUser.points}
								</p>
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
									value={`${userData.username}`}
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
									value={`${userData.email}`}
									disabled
								></input>
								<label
									className="text-white"
									htmlFor="username"
								>
									Password
								</label>
								<input
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									placeholder="Type in new password..."
									type="password"
									className="mb-6 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-sm block w-1/2 p-2.5 dark:bg-gray-600 dark:border-gray-900 dark:placeholder-gray-400 dark:text-gray-400 "
								></input>
								<label
									className="text-white"
									htmlFor="username"
								>
									Confirm Password
								</label>
								<input
									onChange={(e) =>
										setConfirmNewPassword(e.target.value)
									}
									type="password"
									placeholder="Re-enter new password..."
									className="mb-6 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-sm block w-1/2 p-2.5 dark:bg-gray-600 dark:border-gray-900 dark:placeholder-gray-400 dark:text-gray-400 "
								></input>
							</form>
						</div>
					</div>
				</div>
				<div>
					<button
						className="bg-white text-black text-2xl hover:bg-gray-300 p-2 px-4 rounded-lg text-bold items-center justify-center"
						onClick={onSaveChanges}
					>
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export default Account;
