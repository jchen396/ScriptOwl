import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";

interface Props {}

const LOGIN_USER = gql`
	query logInUser($username: String!, $password: ID!) {
		logInUser(username: $username, password: $password) {
			id
			username
			password
			email
		}
	}
`;

const Login: FunctionComponent<Props> = () => {
	const [logInPassword, setLogInPassword] = useState<string>();
	const [logInUsername, setFormUsername] = useState<string>();
	const [logInUser, { data, loading, error }] = useLazyQuery(LOGIN_USER);
	const validateForm = (e: any) => {
		e.preventDefault();
		logInUser({
			variables: {
				username: logInUsername,
				password: logInPassword,
			},
		});
	};
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono">
			<h1 className="text-4xl font-medium text-slate-100">Log In</h1>
			<form
				className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16"
				action="/"
				onSubmit={(e) => validateForm(e)}
			>
				{error?.message && (
					<div className="flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4">
						<p>{error.message}</p>
						<CloseIcon />
					</div>
				)}
				<div className="relative">
					<input
						type="text"
						id="floating_outlined"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						onChange={(e) => {
							setFormUsername(e.target.value);
						}}
					/>
					<label
						htmlFor="floating_outlined"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Username
					</label>
				</div>
				<div className="relative">
					<input
						type="password"
						id="floating_outlined"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						onChange={(e) => {
							setLogInPassword(e.target.value);
						}}
					/>
					<label
						htmlFor="floating_outlined"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Password
					</label>
				</div>
				<Link className="text-sm italic underline" href="">
					Forgot your password?
				</Link>
				<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Log In
				</button>
				<div className="w-2/3 flex flex-row items-center justify-between">
					<p className="basis-2/3">Don&#39;t have an account? </p>
					<Link
						className="basis-1/3 italic underline"
						href="/register"
					>
						Sign Up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
