const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUser,
  loginUser,
} = require('../controllers/users');

// router.post("/register", RegisterUser);
// router.get("/:id", getUser);

router.route('/').get(getAllUsers);
router.route('/register/').post(registerUser);
router.route('/:id').get(getUser);
router.route('/login/').post(loginUser);

module.exports = router;
