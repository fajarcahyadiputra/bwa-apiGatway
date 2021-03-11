const router = require('express').Router();
const ReviewHandler = require('../handler/review');

router.post('/', ReviewHandler.create);
router.delete('/:id', ReviewHandler.destroy);
router.put('/:id', ReviewHandler.update);

module.exports = router;