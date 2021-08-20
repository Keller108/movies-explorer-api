/* eslint-disable import/no-unresolved */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExp = require('../regexp/regexp');

const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().required().min(2)
      .max(30),
    duration: Joi.number().min(1).required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().required().pattern(regExp),
    trailer: Joi.string().required().pattern(regExp),
    thumbnail: Joi.string().required().pattern(regExp),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    movieId: Joi.string(),
  }),
}), postMovie);

router.delete('/movies/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
