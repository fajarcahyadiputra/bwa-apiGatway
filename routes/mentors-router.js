const express = require('express');
const router = express.Router();
const MentorHandler = require('../handler/mentor');

router.post('/', MentorHandler.create);
router.get('/:id', MentorHandler.get);
router.get('/', MentorHandler.gets);
router.put('/:id', MentorHandler.update);
router.delete('/:id', MentorHandler.destory);

module.exports = router;
