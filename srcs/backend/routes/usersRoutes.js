const express = require('express');
// const { getUsers, getUserById, createUser } = require('../db/queries');
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await User.createUser(username, email, password);
    res.json(newUser);
  });
  
  router.get("/:id", async (req, res) => {
    const user = await User.getUserById(req.params.id);
    res.json(user);
  });
  

// // Get all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await getUsers();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get a specific user
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await getUserById(req.params.id);
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Create a user
// router.post('/', async (req, res) => {
//     try {
//         const { username, email } = req.body;
//         const newUser = await createUser(username, email);
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
