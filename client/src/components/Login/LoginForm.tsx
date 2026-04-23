import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { ApolloError } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
	validateForm: (e: React.FormEvent<HTMLFormElement>) => void;
	isFetching: boolean;
	errorMessage: string;
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FunctionComponent<Props> = ({
	validateForm,
	isFetching,
	errorMessage,
	setErrorMessage,
}) => {
	return (
		<>
			<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">Log In</h1>
			<form
				className="flex flex-col space-y-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl text-slate-100 w-11/12 sm:w-3/4 lg:w-1/3 p-8 md:p-12"
				action="/"
				onSubmit={(e) => validateForm(e)}
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
				<div className="relative">
					<input
						type="text"
						id="username"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_outlined"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Username
					</label>
				</div>
				<div className="relative">
					<input
						type="password"
						id="password"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_outlined"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Password
					</label>
				</div>
				<Link className="text-sm italic underline" href="">
					Forgot your password?
				</Link>
				<button
					className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 ${
						isFetching
							? "opacity-70 cursor-not-allowed"
							: "cursor-pointer hover:-translate-y-0.5"
					} `}
				>
					{isFetching ? (
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
							<span>Logging In</span>
						</div>
					) : (
						<p>Log In</p>
					)}
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
		</>
	);
};

export default LoginForm;
