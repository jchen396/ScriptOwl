import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
	const [toggle, setToggle] = useState<Boolean>(false);
	return (
		<div className="absolute flex justify-center items-center w-screen">
			<div className="w-full md:w-3/4 p-2 flex flex-row text-slate-200 items-center justify-around font-sans font-bold text-xl">
				<div className="basis-1/2 flex justify-center">vod_app</div>
				<div
					className={`${
						toggle ? "" : "hidden"
					} flex basis-1/2 p-4 py-20 text-2xl w-screen absolute top-0 z-10 block bg-slate-800 md:bg-transparent flex-col space-y-10 items-center md:space-y-0 md:p-0 md:py-0 md:text-xl md:z-0 md:block md:w-fit md:relative md:justify-around md:flex md:flex-row md:items-center md:justify-center `}
				>
					<div>
						<Link className="hover:text-blue-700" href="/">
							Home
						</Link>
					</div>

					<div>
						<Link className="hover:text-blue-700" href="/login">
							Log In
						</Link>
					</div>
					<div>
						<Link className="hover:text-blue-700" href="/sign-up">
							Sign Up
						</Link>
					</div>
				</div>
				<div>
					<button
						className="relative block md:hidden z-20"
						onClick={() => setToggle(!toggle)}
					>
						<div
							className={`relative flex overflow-hidden items-center justify-center rounded-lg w-[50px] h-[50px] transform transition-all ring-opacity-30 duration-200 ${
								toggle ? "" : "shadow-lg"
							} `}
						>
							<div
								className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden`}
							>
								<div
									className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
										toggle ? "translate-x-10" : ""
									}`}
								></div>
								<div
									className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75 ${
										toggle ? "translate-x-10" : ""
									}`}
								></div>
								<div
									className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 ${
										toggle ? "translate-x-10" : ""
									}`}
								></div>

								<div
									className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
										toggle
											? "translate-x-0 w-12"
											: "-translate-x-10 w-0`}flex w-0 "
									}`}
								>
									<div
										className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${
											toggle ? "rotate-45" : "rotate-0"
										}`}
									></div>
									<div
										className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${
											toggle ? "-rotate-45" : "-rotate-0"
										}`}
									></div>
								</div>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
