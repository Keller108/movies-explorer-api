const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictRequest = require('../errors/ConflictRequest');

const {
  userNotFoundTxt,
  castErrTxt,
  wrongUserDataTxt,
  userExistsTxt,
  validationErrTxt,
} = require('../utils/errorMessages');

const { JWT_SECRET } = require('../utils/config');

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(next(new NotFound(userNotFoundTxt)))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(castErrTxt));
      } return next(err);
    });
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
    .orFail(new NotFound(userNotFoundTxt)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new BadRequest(wrongUserDataTxt));
        } else if (err.name === 'MongoError') {
          next(new ConflictRequest(userExistsTxt));
        } return next(err);
      }));
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email }).then((usr) => {
    if (usr) {
      throw new ConflictRequest(userExistsTxt);
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
            next(new BadRequest(validationErrTxt));
          } return next(err);
        }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequest(validationErrTxt));
        } return next(err);
      });
  })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NotFound(userNotFoundTxt);
  } else {
    User.findOne({ email }).select('+password')
      .orFail(() => {
        throw new BadRequest(wrongUserDataTxt);
      })
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new BadRequest(wrongUserDataTxt);
            } else {
              const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
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
