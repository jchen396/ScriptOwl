import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IUser } from "../../../../types/types";

interface Props {
	onHandleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onHandleVerifyAccount: (
		e: React.FormEvent<HTMLFormElement>
	) => Promise<void>;
	onHandleResendCode: () => Promise<void>;
	errorMessage: string;
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
	resendMessage: string;
	setResendMessage: React.Dispatch<React.SetStateAction<string>>;
	currentUser: IUser;
}

const VerifyCode: React.FC<Props> = ({
	onHandleInputChange,
	onHandleVerifyAccount,
	onHandleResendCode,
	errorMessage,
	setErrorMessage,
	resendMessage,
	setResendMessage,
	currentUser,
}) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-20">
			<div className="relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
				<div className="mx-auto flex w-full max-w-md flex-col space-y-16">
					<div className="flex flex-col items-center justify-center text-center space-y-2">
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
						{resendMessage && (
							<div className="bg-green-500 p-4 rounded flex flex-row justify-start items-center space-x-2">
								<CheckCircleIcon className="text-green-900" />
								<span className="text-black ">
									{resendMessage}
								</span>
								<CloseIcon
									className="hover:cursor-pointer"
									onClick={() => setResendMessage("")}
								/>
							</div>
						)}
						<div className="font-semibold text-3xl text-white">
							<p>Email Verification</p>
						</div>
						<div className="flex flex-row text-sm font-medium text-gray-400">
							<p>
								We have sent a code to your email{" "}
								{currentUser.email}
							</p>
						</div>
					</div>

					<div className="w-full ">
						<form
							action=""
							method="post"
							onSubmit={(e) => onHandleVerifyAccount(e)}
						>
							<div className="flex flex-col space-y-16">
								<div className="flex flex-row items-center justify-between mx-auto w-full max-w-sm">
									<div className="w-14 h-14 ">
										<input
											className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
											type="text"
											maxLength={1}
											name="field-1"
											id="f1"
											onChange={(e) =>
												onHandleInputChange(e)
											}
										/>
									</div>
									<div className="w-14 h-14 ">
										<input
											className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
											type="text"
											name="field-2"
											id="f2"
											maxLength={1}
											onChange={(e) =>
												onHandleInputChange(e)
											}
										/>
									</div>
									<div className="w-14 h-14 ">
										<input
											className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
											type="text"
											name="field-3"
											id="f3"
											maxLength={1}
											onChange={(e) =>
												onHandleInputChange(e)
											}
										/>
									</div>
									<div className="w-14 h-14 ">
										<input
											className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
											type="text"
											name="field-4"
											id="f4"
											maxLength={1}
											onChange={(e) =>
												onHandleInputChange(e)
											}
										/>
									</div>
									<div className="w-14 h-14 ">
										<input
											className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
											type="text"
											name="field-5"
											id="f5"
											maxLength={1}
											onChange={(e) =>
												onHandleInputChange(e)
											}
										/>
									</div>
									<div className="w-14 h-14 ">
										<input
											className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
											type="text"
											name="field-6"
											id="f6"
											maxLength={1}
											onChange={(e) =>
												onHandleInputChange(e)
											}
										/>
									</div>
								</div>

								<div className="flex flex-col space-y-5">
									<div>
										<button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 hover:bg-blue-900 border-none text-white text-sm shadow-sm">
											Verify Account
										</button>
									</div>

									<div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
										<p>Didn&apos;t recieve code?</p>{" "}
										<span
											className="flex flex-row items-center text-blue-600 hover:text-blue-200 hover:cursor-pointer"
											onClick={onHandleResendCode}
										>
											Resend
										</span>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyCode;
