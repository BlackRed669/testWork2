const typeDefs = `
  type Query {
    messages: [Message]
  }

  type Message {
    id: ID!
    content: String!
    fromId: Int!
    toId: Int!
  }
    
  enum SortOrder {
    ASC
    DESC
  }

  type Mutation {
    sendMessage(content: String!, userId: String!): Message
  }
`;

module.exports = typeDefs;