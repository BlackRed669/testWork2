const { gql } = require('apollo-server-express');


module.exports = gql`
  type Query {
    users(myId:Int): [User]
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
  }
    
  enum SortOrder {
    ASC
    DESC
  }

  type Mutation {
   createChat(hostId: Int!, connectId: Int!): Chat
  }

  

`;