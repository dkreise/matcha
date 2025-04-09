const express = require('express');
const router = express.Router();
const {
    handleLogin,
    handleSignup,
    handleRefreshToken,
    handleLogout
} = require('../controllers/auth');

router.route('/login').post(handleLogin);
router.route('/signup').post(handleSignup);
router.route('/refresh').get(handleRefreshToken);
router.route('/logout').get(handleLogout);

module.exports = router;