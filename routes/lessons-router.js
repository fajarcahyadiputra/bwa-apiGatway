const router = require('express').Router();
const LessonHandler = require('../handler/lesson');

router.post('/', LessonHandler.create);
router.put('/:id', LessonHandler.update);
router.delete('/:id', LessonHandler.destroy);
router.get('/:id', LessonHandler.get);
router.get('/', LessonHandler.gets);

module.exports = router;