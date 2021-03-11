const router = require('express').Router();
const ChapterHandler = require('../handler/chapter');

router.post('/', ChapterHandler.create);
router.delete('/:id', ChapterHandler.destroy);
router.get('/', ChapterHandler.gets);
router.get('/:id', ChapterHandler.get);
router.put('/:id', ChapterHandler.update);

module.exports = router;