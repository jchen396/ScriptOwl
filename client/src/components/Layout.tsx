import { PropsWithChildren, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

interface LayoutProps {
	children: ReactNode;
	userData?: {
		username: string;
		password: string;
		id: string;
		email: string;
	};
}

const Layout = ({ userData, children }: LayoutProps) => {
	return (
		<>
			<div className="bg-black w-screen h-screen">
				<Navbar userData={userData} />
				{children}
			</div>
		</>
	);
};

export default Layout;
