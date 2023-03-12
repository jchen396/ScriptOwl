import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "@/redux/apiCalls";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren) => {
	const { currentUser } = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState<{
		username: string;
		password: string;
		id: string;
		email: string;
		avatarKey: string;
	}>();
	useEffect(() => {
		authenticate(dispatch);
	}, [dispatch]);
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
