import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: `${process.env.EXPO_PUBLIC_SERVER_DOMAIN}graphql`,
        credentials: "include",
    }),
    cache: new InMemoryCache(),
});

export default client;
