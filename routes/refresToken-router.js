const router = require('express').Router();
const {refreshToken}     = require('../handler/refreshToken');

router.post('/', refreshToken);

module.exports = router;