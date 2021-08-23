const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const {
  userUnauthorizedTxt,
} = require('../utils/errorMessages');

const { JWT_SECRET } = require('../utils/config');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized(userUnauthorizedTxt));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized(userUnauthorizedTxt));
  }

  req.user = payload;

  return next();
};
