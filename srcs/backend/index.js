const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');
const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
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
app.use('/api/users', userRoutes); // Register user routes
app.use('/api/profile', profileRoutes); // Register profile routes
app.use('/api/test', testRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));




// // Login Route
// app.post('/api/login', (req, res) => {
//     console.log('Login attempt:', req.body);
//     const { email, password } = req.body;
//     const user = users.find(u => u.email === email);
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });

// // Protected Route
// app.get('/api/me', (req, res) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         res.json({ email: decoded.email });
//     } catch {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// });
