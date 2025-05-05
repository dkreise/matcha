const express = require('express');
const router = express.Router();
const {
    getProfileData,
    updateProfileData,
    resetSkippedProfiles,
} = require('../controllers/profile');
const {
    associateTags,
    removeTag,
    getAllTags,
} = require('../controllers/tags');

router.route('/').get(getProfileData);
router.route('/update').post(updateProfileData);
router.route('/reset-skipped-profiles').post(resetSkippedProfiles);
router.route('/all-tags').get(getAllTags);
router.route('/associate-tags').post(associateTags);
router.route('/remove-tag/:tag_name').delete(removeTag);

module.exports = router;