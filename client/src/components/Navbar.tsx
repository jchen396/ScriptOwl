import Link from "next/link";
import Image from "next/image";
import { FunctionComponent, useState } from "react";

interface Props {
	userData?: {
		username: string;
		password: string;
		id: string;
		email: string;
	};
}

const Navbar: FunctionComponent<Props> = ({ userData }) => {
	const [navToggle, setNavToggle] = useState<Boolean>(false);
	const [profToggle, setProfToggle] = useState<Boolean>(false);
	return (
		<nav className="absolute w-full border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-transparent font-mono">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<div>
					<Link href="/" className="flex items-center">
						<Image
							width={36}
							height={36}
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-6 mr-3 sm:h-9"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-xl whitespace-nowrap dark:text-white">
							vod_app
						</span>
					</Link>
				</div>
				<div
					className={`absolute md:static top-14 left-0 items-center justify-between ${
						navToggle ? "block" : "hidden"
					} w-full md:w-fit md:flex md:w-auto md:order-1 z-20 `}
					id="mobile-menu-2"
				>
					<ul
						className={`flex 
						flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-mono md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700`}
					>
						<li>
							<Link
								href="/"
								className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
								aria-current="page"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/services"
								className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Services
							</Link>
						</li>
						<li>
							<Link
								href="/pricing"
								className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Pricing
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex items-center md:order-2">
					<button
						type="button"
						className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						id="user-menu-button"
						aria-expanded="false"
						data-dropdown-toggle="user-dropdown"
						data-dropdown-placement="bottom"
						onFocus={() => setProfToggle(true)}
						onBlur={() =>
							setTimeout(() => setProfToggle(false), 200)
						}
					>
						<Image
							height={32}
							width={32}
							className="w-8 h-8 rounded-full"
							src="/../public/img/blank-profile.png"
							alt="user photo"
						/>
					</button>
					<div
						className={`absolute top-16 right-6 md:right-[2em] 4xl:right-[8rem] ${
							profToggle ? "block" : "hidden"
						} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
						id="user-dropdown font-mono w-[12rem] h-[24rerm]`}
					>
						<div className="px-4 py-3 ">
							<span className="block text-sm text-gray-900 dark:text-white">
								{userData ? userData.username : "Not signed in"}
							</span>
							<span className="block text-sm text-gray-500 truncate dark:text-gray-400">
								{userData ? userData.email : ""}
							</span>
						</div>
						<ul className="py-2" aria-labelledby="user-menu-button">
							<li>
								<Link
									href="/login"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Log In
								</Link>
							</li>
							<li>
								<Link
									href="/register"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Sign Up
								</Link>
							</li>
						</ul>
					</div>

					<button
						data-collapse-toggle="mobile-menu-2"
						type="button"
						className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="mobile-menu-2"
						aria-expanded="false"
						onClick={() => setNavToggle(!navToggle)}
					>
						<div
							className={`relative flex overflow-hidden items-center justify-center rounded-lg w-[50px] h-[50px] transform transition-all ring-opacity-30 duration-200 ${
								navToggle ? "" : "shadow-lg"
							} `}
						>
							<div
								className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden`}
							>
								<div
									className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
										navToggle ? "translate-x-10" : ""
									}`}
								></div>
								<div
									className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75 ${
										navToggle ? "translate-x-10" : ""
									}`}
								></div>
								<div
									className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 ${
										navToggle ? "translate-x-10" : ""
									}`}
								></div>

								<div
									className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
										navToggle
											? "translate-x-0 w-12"
											: "-translate-x-10 w-0`}flex w-0 "
									}`}
								>
									<div
										className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${
											navToggle ? "rotate-45" : "rotate-0"
										}`}
									></div>
									<div
										className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${
											navToggle
												? "-rotate-45"
												: "-rotate-0"
										}`}
									></div>
								</div>
							</div>
						</div>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
