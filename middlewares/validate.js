const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const BadRequest = require('../errors/BadRequest');
const { validationErrTxt } = require('../utils/errorMessages');

const validateURL = (val) => {
  const res = isURL(val);
  if (res) {
    return val;
  }
  throw new BadRequest(validationErrTxt);
};

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(35),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(35),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const validatePostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailer: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().min(1).required(),
  }),
});

const validateDeleteMovie = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateSignIn, validateSignUp, validateUpdateProfile, validatePostMovie, validateDeleteMovie,
};
