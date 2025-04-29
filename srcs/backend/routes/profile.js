const express = require('express');
const router = express.Router();
const {
    getProfileData,
} = require('../controllers/profile');
const {
    associateTags,
} = require('../controllers/tags');

router.route('/').get(getProfileData);
router.route('/associate-tags').post(associateTags);

module.exports = router;