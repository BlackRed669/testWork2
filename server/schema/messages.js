
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    messages(toId:Int): [Message]
  }

  type Message {
    id: ID
    content: String
    fromId: Int
    toId: Int
    chatId: Int
  }
    
  enum SortOrder {
    ASC
    DESC
  }

  type Mutation {
    sendMessage(content: String!, userId: String!): Message
  }
`;