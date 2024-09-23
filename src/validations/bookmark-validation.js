const joi = require('joi');

const urlValidation = (value, helpers) => {
  const githubRepoUrlPattern =
    /^https:\/\/api\.github\.com\/repos\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+$/;

  if (!value.match(githubRepoUrlPattern)) {
    return helpers.message(
      'The URL must be a valid GitHub repository URL in the format: ' +
      'https://api.github.com/repos/<username>/<repository>'
    );
  }
  return value;
}

const addBookMark = {
  params: joi.object().keys({
    userId: joi.string().required(),
  }),
  body: joi.object().keys({
    url: joi.string().required().custom(urlValidation),
    bookMarkId: joi.number().integer().required()
  })
};

const getBookMarks = {
  params: joi.object().keys({
    userId: joi.string().required()
  }),
  query: joi.object().keys({
    startDate: joi.date().timestamp(),
    endDate: joi.date().timestamp(),
    page: joi.number().integer()
  })
};

const getBookMarksStats = {
  params: joi.object().keys({
    userId: joi.string().required()
  }),
  query: joi.object().keys({
    startDate: joi.date().timestamp(),
    endDate: joi.date().timestamp(),
  })
};

const deleteBookMark = {
  params: joi.object().keys({
    userId: joi.string().required(),
    bookMarkId: joi.number().integer().required()
  })
}

module.exports = {
  addBookMark,
  getBookMarks,
  getBookMarksStats,
  deleteBookMark
}