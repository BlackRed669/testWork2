<template>
  <div>
    <h1>Messages</h1>

  </div>
</template>

<script>
import { useQuery, provideApolloClient } from "@vue/apollo-composable"
import gql from "graphql-tag"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core"

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
provideApolloClient(apolloClient);

const result = useQuery(gql`
      query getMyMessages 
      {
        messages(toId: 1)
        { 
          content
          fromId 
        }
      }
    `);

console.log(result);

</script>