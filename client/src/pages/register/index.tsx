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
			<div className="w-screen h-screen flex flex-col justify-center items-center space-y-10 font-mono overflow-y-scroll">
				<RegisterForm
					loading={loading}
					errorMessage={errorMessage}
					successMessage={successMessage}
					signUpForm={signUpForm}
					setErrorMessage={setErrorMessage}
					setSuccessMessage={setSuccessMessage}
				/>
			</div>
		</>
	);
};

export default Register;
