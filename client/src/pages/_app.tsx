import "@/styles/globals.css";
import client from "../../apollo-client";
import Layout from "@/components/Layout";
import { NextComponentType, NextPageContext } from "next";
import { AppInitialProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { useEffect, useState } from "react";

type AppProps<P = any> = AppInitialProps<P> & {
	Component: NextComponentType<NextPageContext, any, any>;
	pageProps: any;
};

export default function App({ Component, pageProps }: AppProps) {
	const [userData, setUserData] = useState<{
		username: string;
		password: string;
		id: string;
		email: string;
	}>();
	const getData = async () => {
		const { data } = await client.query({
			query: gql`
				query getUsers {
					users {
						id
						username
						password
						email
					}
				}
			`,
		});
		return data;
	};
	useEffect(() => {
		getData().then((res) => {
			setUserData(res.users[0]);
		});
	}, []);
	const getLayout = (page: JSX.Element): JSX.Element => (
		<Layout userData={userData}>{page}</Layout>
	);
	return (
		<ApolloProvider client={client}>
			{getLayout(<Component {...pageProps} />)}
		</ApolloProvider>
	);
}
