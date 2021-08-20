/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    minlenght: 1,
    required: true,
  },
  year: {
    type: String,
    minlenght: 4,
    maxlength: 4,
    required: true,
  },
  description: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (poster) => validator.isURL(poster),
      message: 'Введите корректную ссылку на постер',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (trailer) => validator.isURL(trailer),
      message: 'Введите корректную ссылку трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (preview) => validator.isURL(preview),
      message: 'Введите корректную ссылку на превью-изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('movie', movieSchema);
