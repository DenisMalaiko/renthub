import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

export default defineNuxtPlugin(() => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },
  });

  provideApolloClient(apolloClient);
})