const router = require('express').Router();
const ImageCourseHandler = require('../handler/image-courses');

router.post('/', ImageCourseHandler.create);
router.delete('/:id', ImageCourseHandler.destroy);

module.exports = router;