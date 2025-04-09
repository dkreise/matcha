const express = require('express');
const router = express.Router();
const {
    getProfileData,
} = require('../controllers/profile');

router.route('/').get(getProfileData);

module.exports = router;