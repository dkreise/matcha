const express = require('express');
const router = express.Router();
const {
    getRecommendations,
    getSharedTags,
} = require('../controllers/recommendations');
const { makeAction } = require('../controllers/matches');

router.route('/recommendations').get(getRecommendations);
router.route('/shared-tags/:target_id').get(getSharedTags);
router.route('/:action_type/:target_id').post(makeAction);

module.exports = router;