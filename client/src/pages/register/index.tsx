import Head from "next/head";
import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { ADD_USER } from "../../graphql/mutations/addUser";
import { useRouter } from "next/router";
import {
	validateEmail,
	validatePassword,
	validateUsername,
} from "@/functions/validateForm";
import RegisterForm from "@/components/Register/RegisterForm";
import OAuthOptions from "@/components/Register/OAuthOptions";

interface Props {}

const Register: FunctionComponent<Props> = () => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [addUser, { error, loading }] = useMutation(ADD_USER);
	const { currentUser } = useSelector((state: any) => state.user);
	const signUpForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { username, email, password, confirmPassword } = e.currentTarget;
		if (!validateUsername(username.value)) {
			setErrorMessage(
				"Username must be 4-16 characters long, be alphanumeric, and not contain . or - at the beginning or end"
			);
			return;
		}
		if (!validateEmail(email.value)) {
			setErrorMessage("Please enter a valid E-mail.");
			return;
		}
		if (!validatePassword(password.value)) {
			setErrorMessage(
				"Password must be eight or more characters, including upper and lowercase letters, and at least one number. "
			);
			return;
		}
		if (password.value !== confirmPassword.value) {
			setErrorMessage("Passwords do not match.");
			return;
		}
		try {
			await addUser({
				variables: {
					username: username.value,
					password: password.value,
					email: email.value,
					points: 0,
				},
			});
			username.value = "";
			email.value = "";
			password.value = "";
			confirmPassword.value = "";
			setErrorMessage("");
			setSuccessMessage("Successfully created an account.");
		} catch (err) {
			setErrorMessage(err);
			setSuccessMessage("");
		}
	};
	if (currentUser) {
		router.replace("/");
	}
	return (
		<>
			<Head>
				<title>ScriptOwl | Register</title>
				<meta
					name="description"
					content="ScriptOwl is a video streaming site is dedicated to revolutionizing the way people learn and consume media content. By harnessing the power of GPT 3.5, we provide users with real-time translation of video transcripts, as well as a summarization feature that saves time and makes information more digestible. In addition, our quiz creation feature allows users to test their knowledge and reinforce what they've learned. Our goal is to break down language barriers and make learning more accessible to everyone, and we're constantly striving to innovate and improve the user experience. Join us on our mission to bring the world closer together through the power of video."
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					property="og:title"
					content="
					ScriptOwl | Register
				"
					key="title"
				/>
				<link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
			</Head>
			<div className="w-full h-full flex flex-col justify-center items-center space-y-5 font-mono py-10">
				<RegisterForm
					loading={loading}
					errorMessage={errorMessage}
					successMessage={successMessage}
					signUpForm={signUpForm}
					setErrorMessage={setErrorMessage}
					setSuccessMessage={setSuccessMessage}
				/>
				<div className="w-80 flex flex-row justify-center items-center space-x-2">
					<hr className="border-1 border-slate-100 flex-1" />
					<span className="text-slate-100">OR</span>
					<hr className="border-1 border-slate-100 flex-1" />
				</div>
				<OAuthOptions />
			</div>
		</>
	);
};

export default Register;
