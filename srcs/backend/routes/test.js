const express = require('express');
const router = express.Router();
const {
    Hello,
} = require('../controllers/test');

router.route('/hello').get(Hello);

module.exports = router;