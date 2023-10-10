const express = require('express');

const router = express.Router();

router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

module.exports = router;
