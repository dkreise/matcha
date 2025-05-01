const express = require('express');
const router = express.Router();
const {
    getRecommendations ,
} = require('../controllers/recommendations');

router.route('/recommendations').get(getRecommendations);

module.exports = router;