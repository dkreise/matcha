const User = require("../models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await User.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await User.verifyPassword(user, password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' } // to change later
    );
    const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' } 
    );
    // Save refresh token to database?
    // await User.saveRefreshToken(user.id, refreshToken);

    // cookie parsers needed for this
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({ accessToken });
};

module.exports = { handleLogin };