import { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className="bg-black w-screen h-screen">
				<Navbar />
				{children}
			</div>
		</>
	);
};

export default Layout;
