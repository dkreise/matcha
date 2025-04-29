const express = require('express');
const router = express.Router();
const {
    getProfileData,
    updateProfileData,
} = require('../controllers/profile');
const {
    associateTags,
} = require('../controllers/tags');

router.route('/').get(getProfileData);
router.route('/update').post(updateProfileData);
router.route('/associate-tags').post(associateTags);

module.exports = router;