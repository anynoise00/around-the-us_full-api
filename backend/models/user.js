const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UnauthenticatedError = require('../errors/unauthenticated-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: (v) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Costeau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /http[s]?:\/\/(www\.)?.+(\.).+(\/.)*\/?/i.test(v),
      message: (props) => `${props.value} is not a valid link.`,
    },
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user)
        return Promise.reject(
          new UnauthenticatedError('E-mail ou senha incorretos')
        );
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          return Promise.reject(
            new UnauthenticatedError('E-mail ou senha incorretos')
          );
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
