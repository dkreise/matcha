const express = require('express');
const router = express.Router();
const {
    getProfileData,
    updateProfileData,
} = require('../controllers/profile');
const {
    associateTags,
    removeTag,
    getAllTags,
} = require('../controllers/tags');

router.route('/').get(getProfileData);
router.route('/update').post(updateProfileData);
router.route('/all-tags').get(getAllTags);
router.route('/associate-tags').post(associateTags);
router.route('/remove-tag/:tag_name').delete(removeTag);

module.exports = router;