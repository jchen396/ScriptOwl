import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import client from "../../apollo-client";
import { gql } from "@apollo/client";
import { useSelector } from "react-redux";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren) => {
	const { currentUser } = useSelector((state: any) => state.user);
	const [userData, setUserData] = useState<{
		username: string;
		password: string;
		id: string;
		email: string;
	}>();
	useEffect(() => {
		setUserData(currentUser);
	}, [currentUser]);
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
