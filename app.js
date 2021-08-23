const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { errorsHandling } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./utils/rateLimiter');
const { DB, PORT } = require('./utils/config');
require('dotenv').config();

const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(rateLimiter);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandling);

app.listen(PORT);
