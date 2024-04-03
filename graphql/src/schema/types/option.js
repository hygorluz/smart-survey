const { gql } = require("apollo-server");

// Defina o schema GraphQL
const optionType = gql`
  type Option {
    id: String
    title: String
    votes: String
  },
  input OptionInput {
    title: String
  }
`;

module.exports = optionType;
