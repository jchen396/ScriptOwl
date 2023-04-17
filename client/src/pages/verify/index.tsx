import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { VERIFY_USER } from "@/graphql/mutations/verifyUser";
import { useMutation } from "@apollo/client";
import { updateUser } from "@/redux/apiCalls";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RESEND_CODE } from "@/graphql/mutations/resendCode";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {}

const Verify: NextPage<Props> = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [success, setSuccess] = useState<boolean>(false);
	const [redirectCounter, setRedirectCounter] = useState<number>(3);
	const [resendMessage, setResendMessage] = useState<string>("");
	const { currentUser } = useSelector((state: any) => state.user);
	const [verifyUser] = useMutation(VERIFY_USER);
	const [resendCode] = useMutation(RESEND_CODE);
	const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { maxLength, value, name } = e.target;
		const fieldIndex = name.split("-")[1];

		let fieldIntIndex = parseInt(fieldIndex, 10);

		// Check if no of char in field == maxlength
		if (value.length >= maxLength) {
			// It should not be last input field
			if (fieldIntIndex < 6) {
				// Get the next input field using it's name
				const nextField = document.querySelector(
					`input[name=field-${fieldIntIndex + 1}]`
				);

				// If found, focus the next field
				if (nextField !== null) {
					(nextField as HTMLElement).focus();
				}
			}
		}
	};
	const onHandleVerifyAccount = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			const codeFormData = e.currentTarget;
			const inputCodeString: string =
				codeFormData.f1.value +
				codeFormData.f2.value +
				codeFormData.f3.value +
				codeFormData.f4.value +
				codeFormData.f5.value +
				codeFormData.f6.value;
			const inputCode = parseInt(inputCodeString);
			if (inputCode === currentUser.verificationCode) {
				const { data } = await verifyUser({
					variables: {
						id: currentUser.id,
					},
				});
				updateUser(dispatch, data.verifyUser);
				setSuccess(true);
			} else {
				setErrorMessage(
					"Invalid code entered. Please check and try again."
				);
			}
		} catch (e) {
			setErrorMessage(e);
		}
		setResendMessage("");
	};
	const onHandleResendCode = async () => {
		try {
			const { data } = await resendCode({
				variables: {
					id: currentUser.id,
					email: currentUser.email,
				},
			});
			updateUser(dispatch, data.resendCode);
			router.replace("/verify");
			setResendMessage(
				"Verification code sent! Please check your e-mail for the new code."
			);
			setErrorMessage("");
		} catch (e) {
			setErrorMessage(e);
		}
	};
	useEffect(() => {
		if (success === true) {
			const interval = setInterval(() => {
				setRedirectCounter((counter) => counter - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [success]);
	useEffect(() => {
		if (redirectCounter === 0) {
			router.replace("/");
		}
	}, [redirectCounter]);
	useEffect(() => {
		if (currentUser && currentUser.isVerifed) {
			router.replace("/");
		}
	}, [currentUser]);
	return (
		<>
			{success ? (
				<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
					<div className="relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl flex flex-col justify-center items-center text-white">
						<div className="flex flex-row justify-center items-center text-xl">
							<p>Successfully verified account!</p>
							<CheckCircleIcon
								className="text-green-500"
								sx={{ fontSize: 40 }}
							/>
						</div>
						<div>
							<p className="text-gray-400 text-sm">
								Redirecting in {redirectCounter}...
							</p>
						</div>
					</div>
				</div>
			) : (
				<>
					{currentUser ? (
						<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
							<div className="relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
								<div className="mx-auto flex w-full max-w-md flex-col space-y-16">
									<div className="flex flex-col items-center justify-center text-center space-y-2">
										{errorMessage && (
											<div className="w-full flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4 space-x-2">
												<ErrorIcon />
												<p>{errorMessage}</p>
												<CloseIcon
													className="hover:cursor-pointer"
													onClick={() =>
														setErrorMessage("")
													}
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
													onClick={() =>
														setResendMessage("")
													}
												/>
											</div>
										)}
										<div className="font-semibold text-3xl text-white">
											<p>Email Verification</p>
										</div>
										<div className="flex flex-row text-sm font-medium text-gray-400">
											<p>
												We have sent a code to your
												email {currentUser.email}
											</p>
										</div>
									</div>

									<div className="w-full ">
										<form
											action=""
											method="post"
											onSubmit={(e) =>
												onHandleVerifyAccount(e)
											}
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
																onHandleInputChange(
																	e
																)
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
																onHandleInputChange(
																	e
																)
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
																onHandleInputChange(
																	e
																)
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
																onHandleInputChange(
																	e
																)
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
																onHandleInputChange(
																	e
																)
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
																onHandleInputChange(
																	e
																)
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
														<p>
															Didn&apos;t recieve
															code?
														</p>{" "}
														<span
															className="flex flex-row items-center text-blue-600 hover:text-blue-200 hover:cursor-pointer"
															onClick={
																onHandleResendCode
															}
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
					) : (
						<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
							<div className="relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl flex flex-col justify-center items-center text-white">
								<div className="flex flex-row justify-center items-center text-xl">
									<p>Not Authorized </p>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Verify;
