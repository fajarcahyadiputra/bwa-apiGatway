const router = require('express').Router();
const webhookHandler = require('../handler/webhook');

router.post('/', webhookHandler.webhook);

module.exports = router;