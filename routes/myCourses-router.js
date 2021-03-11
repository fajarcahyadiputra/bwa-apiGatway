const router = require('express').Router();
const MycoursesHandler = require('../handler/my-courses');

router.post('/', MycoursesHandler.create);
router.get('/', MycoursesHandler.get);

module.exports = router;