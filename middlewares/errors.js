const { serverTxt } = require('../utils/errorMessages');

const errorsHandling = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? serverTxt
        : message,
    });

  next();
};

module.exports = {
  errorsHandling,
};
