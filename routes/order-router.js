const router = require('express').Router();
const orderHandler = require('../handler/order');

router.get('/', orderHandler.getOrder);

module.exports = router;