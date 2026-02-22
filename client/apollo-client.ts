import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}graphql`,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: "no-cache",
        },
        watchQuery: {
            fetchPolicy: "no-cache",
        },
    },
    credentials: "include",
});

export default client;
