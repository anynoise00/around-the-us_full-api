const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const User = require('../models/user');
const ResourceNotFoundError = require('../errors/resource-not-found-error');

function getUsers(req, res, next) {
  User.find({})
    .orFail(new ResourceNotFoundError())
    .then((users) => res.send(users))
    .catch(next);
}

function getUserByID(req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .orFail(
      new ResourceNotFoundError('O usuário solicitado não foi encontrado.')
    )
    .then((user) => res.send(user))
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => res.send({ data: user }))
        .catch(next);
    })
    .catch(next);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(
      new ResourceNotFoundError('O usuário solicitado não foi encontrado.')
    )
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user_id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(
      new ResourceNotFoundError('O usuário solicitado não foi encontrado.')
    )
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(
      new ResourceNotFoundError('O usuário atual não existe no servidor.')
    )
    .then((user) => res.send(user))
    .catch(next);
}

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
