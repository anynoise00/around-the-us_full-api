require('dotenv').config();

const { PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { rateLimit } = require('express-rate-limit');

const { errorHandler, routeNotFound } = require('./middlewares/middlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const { checkAuthorization } = require('./middlewares/auth');

const app = express();
const router = require('./routes/router');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
  console.log('1');
  next();
});

app.use(helmet());

app.use((req, res, next) => {
  console.log('2');
  next();
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('3');
  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(checkAuthorization);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT);
