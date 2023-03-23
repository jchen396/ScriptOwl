import { FormEvent, FunctionComponent, useState } from "react";
import { login } from "@/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoginForm from "@/components/Login/LoginForm";

interface Props {}

const Login: FunctionComponent<Props> = () => {
	const router = useRouter();
	const { currentUser, error } = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const validateForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(dispatch, {
			logInUsername: e.currentTarget.username.value,
			logInPassword: e.currentTarget.password.value,
		});
	};
	if (currentUser) {
		router.back();
	}
	return (
		<>
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono">
				<LoginForm error={error} validateForm={validateForm} />
			</div>
		</>
	);
};

export default Login;
