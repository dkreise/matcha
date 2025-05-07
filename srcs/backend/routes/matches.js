const express = require('express');
const router = express.Router();
const {
    getRecommendations,
    getAdditionalProfileInfo,
} = require('../controllers/recommendations');
const {
    makeAction,
    getInterestedUsers,
    getUserActivity,
} = require('../controllers/matches');

router.route('/recommendations').get(getRecommendations);
router.route('/additional-info/:target_id').get(getAdditionalProfileInfo);
router.route('/:action_type/:target_id').post(makeAction);
router.route('/interested-users').get(getInterestedUsers);
router.route('/activity').get(getUserActivity);

module.exports = router;