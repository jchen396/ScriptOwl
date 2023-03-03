import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

export default function Home() {
	return (
		<>
			<Layout>
				<div className="bg-slate-900 w-screen h-screen"></div>
			</Layout>
		</>
	);
}
