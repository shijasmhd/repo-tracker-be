const express = require('express');
const router = express.Router();
const authRoute = require('./auth-route');
const bookmarkRoute = require('./bookmark-route');

router.use('/auth', authRoute);
router.use('/users', bookmarkRoute);

module.exports = router;