const express = require('express');
const router = express.Router();
const {
    getRecommendations,
    getSharedTags,
} = require('../controllers/recommendations');

router.route('/recommendations').get(getRecommendations);
router.route('/shared-tags/:target_id').get(getSharedTags);

module.exports = router;