import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}graphql`,
	cache: new InMemoryCache(),
	credentials: "include",
});

export default client;
