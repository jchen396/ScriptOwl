import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "@/redux/apiCalls";
import { IUser } from "../../../types/types";

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
			<div className="bg-black">
				<Navbar userData={userData} />
				{children}
			</div>
		</>
	);
};

export default Layout;
