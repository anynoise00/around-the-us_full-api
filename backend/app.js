require('dotenv').config();
const { PORT = 3000, MONGODB_URL = 'aroundb' } = process.env;

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { errorHandler, routeNotFound } = require('./middlewares/middlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimit } = require('express-rate-limit');

const app = express();
const router = require('./routes/router');
const { login, createUser } = require('./controllers/users');
const { checkAuthorization } = require('./middlewares/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

mongoose.connect(`mongodb://127.0.0.1:27017/${MONGODB_URL}`);

app.use(helmet());
app.use(
  cors({
    origin:
      process.env.ENVIRONMENT === 'production' ? req.headers.hostname : '*',
  })
);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(checkAuthorization);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT);
