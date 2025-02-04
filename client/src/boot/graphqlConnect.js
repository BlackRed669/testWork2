import { provideApolloClient } from "@vue/apollo-composable"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core"

const httpLink = createHttpLink({
  uri: "https://testwork2.onrender.com:4000/graphql",
})

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

provideApolloClient(apolloClient);