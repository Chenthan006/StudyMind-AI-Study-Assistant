const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.put('/update', require('../middleware/auth'), require('../controllers/authController').updateProfile);
router.put('/change-password', require('../middleware/auth'), require('../controllers/authController').changePassword);

module.exports = router;