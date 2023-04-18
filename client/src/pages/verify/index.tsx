import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VERIFY_USER } from "@/graphql/mutations/verifyUser";
import { useMutation } from "@apollo/client";
import { updateUser } from "@/redux/apiCalls";
import { RESEND_CODE } from "@/graphql/mutations/resendCode";
import Unauthorized from "@/components/Verify/Unauthorized";
import VerifySuccess from "@/components/Verify/VerifySuccess";
import VerifyCode from "@/components/Verify/VerifyCode";

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
				<VerifySuccess redirectCounter={redirectCounter} />
			) : (
				<>
					{currentUser ? (
						<VerifyCode
							onHandleInputChange={onHandleInputChange}
							onHandleVerifyAccount={onHandleVerifyAccount}
							onHandleResendCode={onHandleResendCode}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							resendMessage={resendMessage}
							setResendMessage={setResendMessage}
							currentUser={currentUser}
						/>
					) : (
						<Unauthorized />
					)}
				</>
			)}
		</>
	);
};

export default Verify;
