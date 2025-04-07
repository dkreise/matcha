const express = require('express');
const router = express.Router();
const {
    handleLogin,
    handleRefreshToken,
    handleLogout
} = require('../controllers/auth');

router.route('/login').post(handleLogin);
router.route('/refresh').get(handleRefreshToken);
router.route('/logout').get(handleLogout);

module.exports = router;