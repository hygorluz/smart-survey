const { gql } = require("apollo-server");

const surveyQuery = gql`
  type Query {
    survey: [Survey!]
    getSurveyById(id: String!): Survey
  }
`;

module.exports = surveyQuery;
