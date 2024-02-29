const Prefer = require('../models/prefer');

const surveyService = {
  createSurvey(records) {
    return Prefer.bulkCreate(records, { individualHooks: true });
  },
};

module.exports = surveyService;
