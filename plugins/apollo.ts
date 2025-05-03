import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client/core";
import { UserModule } from "~/store/user";
import { createHttpLink } from "@apollo/client/link/http";
import {useRuntimeConfig} from "nuxt/app";


export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const httpLink = createHttpLink({
    uri: `${config.public.API_URL}/graphql`,
    credentials: "include",
    headers: {
      "Apollo-Require-Preflight": "true",
    },
  });


  let authLink = new ApolloLink((operation, forward) => {
    const userModule = UserModule();
    const token = userModule.user.token;

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Apollo-Require-Preflight": true,
      },
    });

    return forward(operation);
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink), // комбінуємо authLink та httpLink
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

  const updateAuthLink = (newToken: string) => {
    authLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          Authorization: newToken ? `Bearer ${newToken}` : "",
          "Apollo-Require-Preflight": true,
        },
      });
      return forward(operation);
    });

    apolloClient.setLink(authLink.concat(httpLink));
  };


  const userModule = UserModule();
  const storedToken = userModule.user.token;
  if (storedToken) {
    updateAuthLink(storedToken);
  }

  provideApolloClient(apolloClient);
})