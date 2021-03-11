const express = require('express');
const router = express.Router();
const {register, login, update, getUser, logout} = require("../handler/user");
//middleware verify token
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken ,getUser);
router.post('/', register);
router.post('/login', login);
router.put('/', verifyToken, update);
router.post('/logout', verifyToken, logout);

module.exports = router;
