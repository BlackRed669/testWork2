<template>
  <div>
    <h1>Messages</h1>

  </div>
</template>

<script>
import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"


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