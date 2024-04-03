const Surveys = require("./surveyResolver");

// Objeto de resolvers

const resolvers = {
  Query: {
    survey: Surveys.getSurveys,
    getSurveyById: Surveys.getSurveyById,
  },
  Mutation: { 
    createSurvey: Surveys.createSurvey,
    updateSurveyById: Surveys.updateSurveyById,
    deleteSurveyById: Surveys.deleteSurveyById,
    voteSurveyById: Surveys.voteSurveyById,
  }
};

module.exports = resolvers;