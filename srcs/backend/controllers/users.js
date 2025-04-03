const User = require("../models/user");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await User.createUser(username, email, password);
    res.json(newUser);
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.getUserById(Number(id));
    res.json(user);
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
    getUser,
    loginUser,
}