const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFound = require('../errors/NotFound');
const { notFoundTxt } = require('../utils/errorMessages');
const { validateSignIn, validateSignUp } = require('../middlewares/validate');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use('/', auth, require('./user'));
router.use('/', auth, require('./movie'));

router.all('*', (req, res, next) => next(new NotFound(notFoundTxt)));

module.exports = router;
