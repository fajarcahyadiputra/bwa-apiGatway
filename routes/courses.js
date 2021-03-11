const express = require('express');
const router = express.Router();
const CourseHandler = require('../handler/course');
const verifyToken  = require('../middleware/verifyToken');
const permission = require('../middleware/permission');

router.post('/', verifyToken ,permission('admin'),CourseHandler.create);
router.get('/:id', CourseHandler.get);
router.get('/', CourseHandler.getAll);
router.put('/:id', verifyToken ,permission('admin'),CourseHandler.update);
router.delete('/:id', verifyToken , permission('admin') ,CourseHandler.destroy);

module.exports = router;
