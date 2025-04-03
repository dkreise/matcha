const User = require("../models/user");

const registerUser = async (req, res) => {
    const { username, first_name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
    }
    const newUser = await User.createUser(username, first_name, email, password);
    res.json(newUser);
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(Number(id));
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await User.verifyPassword(user, password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // const token = User.generateToken(user);
    // res.json({ token });
    res.json(user);
}

module.exports = {
    registerUser,
    getAllUsers,
    getUser,
    loginUser,
}