const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { errorsHandling } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./utils/rateLimiter');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb', {
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
