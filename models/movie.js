const mongoose = require('mongoose');

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
  },
  trailer: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    minlength: 1,
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
