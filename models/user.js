const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Никита Исаев',
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный формат почты.',
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
