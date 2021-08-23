const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFound = require('../errors/NotFound');
const { notFoundTxt } = require('../utils/errorMessages');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(35),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(35),
  }),
}), login);

router.use('/', auth, require('./user'));
router.use('/', auth, require('./movie'));

router.all('*', (req, res, next) => next(new NotFound(notFoundTxt)));

module.exports = router;
