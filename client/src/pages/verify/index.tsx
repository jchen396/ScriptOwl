import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { VERIFY_USER } from "@/graphql/mutations/verifyUser";
import { useMutation } from "@apollo/client";
import { updateUser } from "@/redux/apiCalls";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {}

const Verify: NextPage<Props> = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<boolean>(false);
	const [redirectCounter, setRedirectCounter] = useState<number>(3);
	const { currentUser } = useSelector((state: any) => state.user);
	const [verifyUser, { loading }] = useMutation(VERIFY_USER);
	useEffect(() => {
		if (!currentUser || (currentUser && currentUser.isVerifed)) {
			router.replace("/");
		}
	}, []);
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
				setError("Invalid code entered. Please check and try again.");
			}
		} catch (e) {
			setError(e);
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
				<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
					<div className="relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
						<div className="mx-auto flex w-full max-w-md flex-col space-y-16">
							<div className="flex flex-col items-center justify-center text-center space-y-2">
								{error && (
									<div className="w-full flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4">
										<p>{error}</p>
										<CloseIcon />
									</div>
								)}
								<div className="font-semibold text-3xl text-white">
									<p>Email Verification</p>
								</div>
								<div className="flex flex-row text-sm font-medium text-gray-400">
									<p>
										We have sent a code to your email
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
												<a
													className="flex flex-row items-center text-blue-600 hover:text-blue-200"
													href="http://"
													target="_blank"
													rel="noopener noreferrer"
												>
													Resend
												</a>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Verify;
