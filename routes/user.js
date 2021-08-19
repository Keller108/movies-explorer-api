/* eslint-disable import/no-unresolved */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserById, updateProfile,
} = require('../controllers/user');

router.get('/users/me', getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
  }),
}), updateProfile);

module.exports = router;
