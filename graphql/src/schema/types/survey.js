const { gql } = require("apollo-server");

// Defina o schema GraphQL
const typeDefs = gql`
  type Survey {
    id: String
    title: String
    description: String
    createdAt: String
    updatedAt: String
    expiresAt: String
    options: [Option!]
  }
`;
module.exports = typeDefs;
