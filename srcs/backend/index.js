const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');
const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const matchesRoutes = require('./routes/matches');
require('dotenv').config();
const verifyJWT = require('./middleware/verifyJWT');

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(cors()); // Allow frontend to talk to backend
app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend origin (React app)
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: ['Content-Type', 'Authorization'], // Make sure Authorization is allowed
}));

// routes without need for JWT verification
app.use('/api/auth', authRoutes);
// ...

// routes that need JWT verification
app.use(verifyJWT); // Apply JWT verification middleware to all routes below this line
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/test', testRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
