const express = require('express');
const router = express.Router();
const {
    getProfileData,
    updateProfileData,
} = require('../controllers/profile');
const {
    associateTags,
    getAllTags,
} = require('../controllers/tags');

router.route('/').get(getProfileData);
router.route('/update').post(updateProfileData);
router.route('/all-tags').get(getAllTags);
router.route('/associate-tags').post(associateTags);

module.exports = router;