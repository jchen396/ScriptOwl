import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "@/redux/apiCalls";
import { IUser } from "../../../types/types";
import Footer from "./Footer";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren) => {
	const { currentUser } = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState<IUser>();
	useEffect(() => {
		authenticate(dispatch);
	}, [dispatch]);
	useEffect(() => {
		setUserData(currentUser);
	}, [currentUser]);
	return (
		<>
			<div className="bg-black min-w-full min-h-screen overflow-y-auto flex flex-col">
				<Navbar userData={userData} />
				<main className="flex-1">{children}</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
