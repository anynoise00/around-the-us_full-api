const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getUsers,
  getUserByID,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUserByID
);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
      avatar: Joi.string().required().uri(),
    }),
  }),
  createUser
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
    }),
  }),
  updateProfile
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateAvatar
);

module.exports = router;
