const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');
const testRoutes = require('./routes/test');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// app.use(cors()); // Allow frontend to talk to backend
app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend origin (React app)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Make sure Authorization is allowed
}));

app.use('/api/users', userRoutes); // Register user routes
app.get('/api/test', testRoutes);

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
