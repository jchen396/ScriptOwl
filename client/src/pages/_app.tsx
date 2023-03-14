import "@/styles/globals.css";
import client from "../../apollo-client";
import Layout from "@/components/Layout";
import { NextComponentType, NextPageContext } from "next";
import { AppInitialProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { store } from "./../redux/store";
import { Provider } from "react-redux";

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
