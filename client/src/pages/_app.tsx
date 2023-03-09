import "@/styles/globals.css";
import client from "../../apollo-client";
import Layout from "@/components/Layout";
import { NextComponentType, NextPageContext } from "next";
import { AppInitialProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { store } from "./../redux/store";
import { Provider, useSelector } from "react-redux";

type AppProps<P = any> = AppInitialProps<P> & {
	Component: NextComponentType<NextPageContext, any, any>;
	pageProps: any;
};

export default function App({ Component, pageProps }: AppProps) {
	const getLayout = (page: JSX.Element): JSX.Element => (
		<Layout>{page}</Layout>
	);
	return (
		<Provider store={store}>
			<ApolloProvider client={client}>
				{getLayout(<Component {...pageProps} />)}
			</ApolloProvider>
		</Provider>
	);
}
