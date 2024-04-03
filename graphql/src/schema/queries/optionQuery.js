const { gql } = require("apollo-server");

const optionQuery = gql`
  type Query {
    option: [Option]
  }
`;

module.exports = optionQuery;
