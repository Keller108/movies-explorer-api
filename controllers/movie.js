/* eslint-disable max-len */
const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN, owner: ownerId,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Вы не заполнили обязательные поля или данные не верны');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new Error('IncorrectID');
    })
    .then((movie) => {
      if (movie.owner.toString === req.user._id) {
        movie.remove();
        res.status(200).send({ message: 'Фильм успешно удален.' });
      } else {
        throw new Forbidden('Недостаточно прав для удаления фильма');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Фильм с указанным id не найден.');
      } else if (err.name === 'IncorrectID') {
        throw new NotFound('Фильм с указанным id не найден.');
      } else next(err);
    })
    .catch(next);
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
