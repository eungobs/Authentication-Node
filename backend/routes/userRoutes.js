const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/userController');

// Example routes
router.get('/users', getUsers);
router.post('/users', addUser);

module.exports = router;
