import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { login } from "@/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoginForm from "@/components/Login/LoginForm";

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
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
				<LoginForm
					validateForm={validateForm}
					isFetching={isFetching}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
				/>
			</div>
		</>
	);
};

export default Login;
