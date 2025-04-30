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
    console.log('User found:', user);
    // Generate JWT token
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' } // to change later, '15m' for example
    );
    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' } 
    );
    // Save refresh token to database?
    // await User.saveRefreshToken(user.id, refreshToken);

    // cookie parsers needed for this
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'strict', 
        secure: false, // Set to true if using https
    });
    res.json({ accessToken });
};

const handleSignup = async (req, res) => {
    const { username, first_name, email, password } = req.body;
    if (!username || !first_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
    }
    // TODO: check email if exists, check username for chars, check password strength

    const newUser = await User.createUser(username, first_name, email, password);
    if (!newUser) {
        return res.status(500).json({ message: "Error creating user" });
    }
    const accessToken = jwt.sign(
        { id: newUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' } // to change later
    );
    const refreshToken = jwt.sign(
        { id: newUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' } 
    );
    // Save refresh token to database?
    // await User.saveRefreshToken(newUser.id, refreshToken);
    // cookie parsers needed for this
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'strict', 
        secure: false, // Set to true if using https
    });
    res.json({ accessToken });
};

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log('Cookies:', cookies.jwt); 

    const refreshToken = cookies.jwt;

    // Check if refresh token is in the database (then change function to async!!)
    // const user = await User.getUserByRefreshToken(refreshToken);
    // if (!user) return res.sendStatus(403); // Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden // to add: or user.username != decoded.username

            const accessToken = jwt.sign(
                { id: decoded.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );

            console.log("New access token!!");

            res.json({ accessToken });
        }
    );
};

const handleLogout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    // delete refresh token in the database
    // await User.deleteRefreshToken(cookies.jwt);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'Lax', secure: false }); // secure: true, sameSite: 'None' if using https 
    res.sendStatus(204);
};

module.exports = { handleLogin, handleSignup, handleRefreshToken, handleLogout };