import { ApolloError } from "@apollo/client";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

type Props = {
	loading: boolean;
	errorMessage: string;
	successMessage: string;
	signUpForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
};

const RegisterForm: React.FunctionComponent<Props> = ({
	loading,
	errorMessage,
	successMessage,
	signUpForm,
	setErrorMessage,
	setSuccessMessage,
}) => {
	return (
		<>
			<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">Sign Up</h1>
			<form
				onSubmit={(e) => signUpForm(e)}
				className="flex flex-col space-y-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl text-slate-100 w-11/12 sm:w-3/4 lg:w-1/3 p-8 md:p-12"
			>
				{errorMessage && (
					<div className="flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4 space-x-2">
						<ErrorIcon />
						<p>{errorMessage}</p>
						<CloseIcon
							className="hover:cursor-pointer"
							onClick={() => setErrorMessage("")}
						/>
					</div>
				)}
				{successMessage && (
					<div className="bg-green-500 p-4 rounded flex flex-row justify-between items-center space-x-2">
						<CheckCircleIcon className="text-green-900" />
						<p className="text-black ">{successMessage}</p>
						<CloseIcon
							className="hover:cursor-pointer text-green-900"
							onClick={() => setSuccessMessage("")}
						/>
					</div>
				)}
				<div className="grid gap-6 mb-6 md:grid-cols-2 ">
					<div className="relative">
						<input
							type="text"
							id="username"
							className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
							placeholder=" "
							required
						/>
						<label
							htmlFor="username"
							className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
						>
							Username
						</label>
					</div>
					<div className="relative">
						<input
							type="text"
							id="email"
							className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
							placeholder=" "
							required
						/>
						<label
							htmlFor="email"
							className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
						>
							Email
						</label>
					</div>
				</div>
				<div className="relative mb-6">
					<input
						type="password"
						id="password"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						required
					/>
					<label
						htmlFor="password"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Password
					</label>
				</div>
				<div className="relative mb-6">
					<input
						type="password"
						id="confirmPassword"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						required
					/>
					<label
						htmlFor="confirmPassword"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Confirm password
					</label>
				</div>
				<div className="flex items-start mb-6">
					<div className="flex items-center h-5">
						<input
							id="remember"
							type="checkbox"
							value=""
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
							required
						/>
					</div>
					<label
						htmlFor="remember"
						className="ml-2 text-sm text-gray-900 dark:text-gray-300"
					>
						I agree with the{" "}
						<a
							href="#"
							className="text-blue-600 hover:underline dark:text-blue-500"
						>
							terms and conditions
						</a>
						.
					</label>
				</div>
				<button
					type="submit"
					className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 ${
						loading
							? "opacity-70 cursor-not-allowed"
							: "cursor-pointer hover:-translate-y-0.5"
					} `}
				>
					{loading ? (
						<div className="w-full flex flex-row justify-center items-center space-x-4">
							<div role="status">
								<div
									className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								>
									<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
										Loading...
									</span>
								</div>
								<span className="sr-only">Loading...</span>
							</div>
							<span>Creating Account...</span>
						</div>
					) : (
						<p>Sign Up</p>
					)}
				</button>
			</form>
		</>
	);
};

export default RegisterForm;
