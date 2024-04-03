const { gql } = require("apollo-server");
const surveyType = require("./survey");
const optionType = require("./option");

const typeDefs = gql`
  ${surveyType}
  ${optionType}
`;

module.exports = typeDefs;
