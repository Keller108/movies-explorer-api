/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictRequest = require('../errors/ConflictRequest');

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователя с таким Id не существует');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Некорректный Id');
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .orFail(() => {
      throw new Error('IncorrectID');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequest('Данные пользователя не корректны');
      } else if (err.message === 'IncorrectID') {
        throw new NotFound('Пользователь не найден');
      } else next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email }).then((usr) => {
    if (usr) {
      throw new ConflictRequest('Пользователь с таким email уже существует!');
    }

    bcrypt.hash(password, 10)

      .then((hash) => User.create({
        name, email, password: hash,
      })
        .then((user) => {
          const userDoc = user._doc;
          delete userDoc.password;
          res.status(200).send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequest('Ошибка при создании пользователя');
          } else next(err);
        }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequest('Некорректные данные');
        } else next(err);
      });
  })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NotFound('Указанные email или пароль не найдены');
  } else {
    User.findOne({ email }).select('+password')
      .orFail(() => {
        throw new BadRequest('Некорректный email');
      })
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new BadRequest('Указан неправильный email или пароль.');
            } else {
              const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'my-super-duper-secret', { expiresIn: '7d' });
              res.status(201).send({ token });
            }
          })
          .catch((err) => next(err));
      })
      .catch(next);
  }
};

module.exports = {
  getUserById, updateProfile, createUser, login,
};
