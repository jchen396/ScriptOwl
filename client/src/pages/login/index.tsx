import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { login } from "@/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoginForm from "@/components/Login/LoginForm";
import Head from "next/head";
import OAuthOptions from "@/components/Register/OAuthOptions";

interface Props {}

const Login: FunctionComponent<Props> = () => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { currentUser, error, isFetching } = useSelector(
		(state: any) => state.user
	);
	const dispatch = useDispatch();
	const validateForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(dispatch, {
			logInUsername: e.currentTarget.username.value,
			logInPassword: e.currentTarget.password.value,
		});
	};
	useEffect(() => {
		if (currentUser) {
			if (!currentUser.isVerified) {
				router.replace("/verify");
			} else {
				router.back();
			}
		}
	}, [currentUser, router]);
	useEffect(() => {
		if (error) {
			setErrorMessage(
				"Something went wrong. Please check your username and password and try again."
			);
		} else {
			setErrorMessage("");
		}
	}, [error]);
	return (
		<>
			<Head>
				<title>ScriptOwl | Log In</title>
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
					ScriptOwl | Log In
				"
					key="title"
				/>
				<link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
			</Head>
			<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
				<LoginForm
					validateForm={validateForm}
					isFetching={isFetching}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
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

export default Login;
