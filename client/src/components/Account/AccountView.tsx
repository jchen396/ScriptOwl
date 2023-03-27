import { IUser } from "@/types/types";
import React from "react";
import { ParsedUrlQuery } from "querystring";
import AccountForm from "./AccountForm";
import Avatar from "./Avatar";
import Points from "./Points";

interface Props {
	imageKey: string;
	currentUser: IUser;
	userData: IUser | ParsedUrlQuery;
	onEditToggle: () => void;
	onResetPhoto: () => void;
	onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSaveChanges: (e: any) => Promise<void>;
	editToggle: boolean;
	changePassword?: boolean;
	setChangePassword: React.Dispatch<
		React.SetStateAction<boolean | undefined>
	>;
	newPassword: string;
	setNewPassword: React.Dispatch<React.SetStateAction<string>>;
	confirmNewPassword: string;
	setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
}
const AccountView: React.FunctionComponent<Props> = ({
	imageKey,
	currentUser,
	userData,
	onEditToggle,
	onResetPhoto,
	onFileSelect,
	onSaveChanges,
	editToggle,
	changePassword,
	setChangePassword,
	newPassword,
	setNewPassword,
	confirmNewPassword,
	setConfirmNewPassword,
}) => {
	return (
		<>
			<h1 className="text-4xl font-medium text-slate-100">Account</h1>
			<div className="flex flex-col space-y-4 border-2 border-slate-100 bg-transparent text-slate-100 w-2/3 h-2/3 md:py-20 md:px-0">
				<div className="w-full h-full flex flex-col justify-between items-center md:flex-row space-y-10">
					<div className="h-full flex flex-col justify-between items-center basis-1/2 space-y-10">
						<Avatar
							imageKey={imageKey}
							currentUser={currentUser}
							onEditToggle={onEditToggle}
							onResetPhoto={onResetPhoto}
							onFileSelect={onFileSelect}
							editToggle={editToggle}
						/>
						<Points currentUser={currentUser} />
					</div>
					<AccountForm
						userData={userData}
						changePassword={changePassword}
						setChangePassword={setChangePassword}
						setNewPassword={setNewPassword}
						confirmNewPassword={confirmNewPassword}
						setConfirmNewPassword={setConfirmNewPassword}
					/>
				</div>
			</div>
			{(newPassword || imageKey) && (
				<div>
					<button
						className="bg-white text-black text-2xl hover:bg-gray-300 p-2 px-4 rounded-lg text-bold items-center justify-center"
						onClick={onSaveChanges}
					>
						<span>Save changes</span>
					</button>
				</div>
			)}
		</>
	);
};

export default AccountView;