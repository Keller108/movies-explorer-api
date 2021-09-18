const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const {
  validationErrTxt,
  movieNotFoundTxt,
  movieForbiddenTxt,
  movieNotValidTxt,
} = require('../utils/errorMessages');

const getMovies = (req, res, next) => {
  const owner = req.body._id;
  Movie.find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(validationErrTxt));
      } return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFound(movieNotFoundTxt))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.remove()
          .then(() => res.status(200).send({ message: 'Фильм успешно удален.' }));
      } return next(new Forbidden(movieForbiddenTxt));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequest(movieNotValidTxt));
      } return next(err);
    });
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
