const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Route to create a new user & login
router.post('/register', createUser);
router.post('/login', loginUser);

// Example of a protected route (only accessible if authenticated)
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
