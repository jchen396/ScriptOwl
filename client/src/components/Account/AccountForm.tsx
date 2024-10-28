import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IUser } from "./../../../../types/types";
import { ParsedUrlQuery } from "querystring";

interface Props {
	currentUser: IUser;
	changePassword?: boolean;
	setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
	changeUsername?: boolean;
	setChangeUsername: React.Dispatch<React.SetStateAction<boolean>>;
	setNewPassword: React.Dispatch<React.SetStateAction<string>>;
	setNewUsername: React.Dispatch<React.SetStateAction<string>>;
	confirmNewPassword: string;
	setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AccountForm: React.FunctionComponent<Props> = ({
	currentUser,
	changePassword,
	setChangePassword,
	changeUsername,
	setChangeUsername,
	setNewPassword,
	setNewUsername,
	setConfirmNewPassword,
}) => {
	return (
		<>
			<div className="basis-1/2">
				{changePassword ? (
					<form
						className="flex flex-col space-y-4 items-center"
						action="submit"
					>
						<button
							className="self-start border-2 p-2 border-white hover:bg-white text-white hover:text-black rounded-lg "
							onClick={() => setChangePassword(false)}
						>
							<ArrowBackIcon />
						</button>
						<label className="text-white" htmlFor="username">
							Password
						</label>
						<input
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="Type in new password..."
							type="password"
							className="mb-6 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-sm block w-1/2 p-2.5 dark:bg-gray-600 dark:border-gray-900 dark:placeholder-gray-400 dark:text-gray-400 "
						></input>
						<label className="text-white" htmlFor="username">
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
				) : (
					<div className="flex flex-col ">
						{changeUsername ? (
							<form
								action=""
								className="w-full flex flex-col space-y-4 justify-center items-center"
							>
								<label
									className="text-white"
									htmlFor="newUsername"
								>
									New Username
								</label>
								<div className="flex justify-center items-center">
									<button
										onClick={() => setChangeUsername(false)}
										className="flex flex-row items-center p-2 border-2 border-white rounded-lg hover:bg-white hover:text-black"
									>
										<ArrowBackIcon />
									</button>
									<input
										onChange={(e) =>
											setNewUsername(
												e.currentTarget.value
											)
										}
										type="text"
										id="disabled-input"
										aria-label="disabled input"
										className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									></input>
									<button className="flex flex-row items-center p-2 border-2 border-white rounded-lg hover:bg-white hover:text-black">
										Confirm
									</button>
								</div>
							</form>
						) : (
							<button
								onClick={() => setChangeUsername(true)}
								className="flex flex-row justify-center w-1/2 items-center p-2 border-2 border-white rounded-lg hover:bg-white hover:text-black"
							>
								<span className="px-2">Change Username</span>
								<ArrowForwardIcon />
							</button>
						)}
						<form
							className="flex flex-col space-y-4 items-center"
							action=""
						>
							<label className="text-white" htmlFor="username">
								Username
							</label>
							<input
								type="text"
								id="disabled-input"
								aria-label="disabled input"
								className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-not-allowed dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={`${currentUser.username}`}
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
								value={`${currentUser.email}`}
								disabled
							></input>
							<button
								className="flex flex-row items-center p-2 border-2 border-white rounded-lg hover:bg-white hover:text-black"
								onClick={() => setChangePassword(true)}
							>
								<span className="px-2">Change password</span>
								<ArrowForwardIcon />
							</button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default AccountForm;
