import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

//const httpLink = new HttpLink({ uri: "http://192.168.0.104:20000/graphql/" });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({ uri: "http://192.168.0.104:20000/graphql/" });

export const client = new ApolloClient({
  link: from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
});
