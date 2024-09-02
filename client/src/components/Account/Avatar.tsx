import { IUser } from "./../../../../types/types";
import Image from "next/image";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
	currentUser: IUser;
	imageKey: string;
	onEditToggle: () => void;
	onResetPhoto: () => void;
	onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
	editToggle: boolean;
};

const Avatar: React.FunctionComponent<Props> = ({
	currentUser,
	imageKey,
	onEditToggle,
	onResetPhoto,
	onFileSelect,
	editToggle,
}) => {
	return (
		<>
			<div className="flex flex-col space-y-4 justify-center items-center">
				<p className="text-xl">Profile picture</p>
				{imageKey ? (
					<Image
						height={100}
						width={100}
						className="w-32 h-32 rounded-full"
						src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${imageKey}`}
						alt="user photo"
					/>
				) : (
					<Image
						height={100}
						width={100}
						className="w-32 h-32 rounded-full"
						src={
							currentUser.avatarKey.startsWith(
								"https://lh3.googleusercontent.com"
							)
								? currentUser.avatarKey
								: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${currentUser.avatarKey}`
						}
						alt="user photo"
					/>
				)}
				<div className="flex flex-col items-center p-4 bg">
					<button
						onClick={onEditToggle}
						className={`p-1 px-2 space-x-1 rounded-lg flex flex-row items-center bg-gray-800 ${
							currentUser.isVerified
								? "hover:bg-gray-500 hover:cursor-pointer"
								: "hover:cursor-not-allowed"
						}`}
						disabled={!currentUser.isVerified}
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
								onChange={(e) => onFileSelect(e)}
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
		</>
	);
};

export default Avatar;
