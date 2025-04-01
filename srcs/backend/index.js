// srcs/backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/usersRoutes');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to talk to backend

app.use(bodyParser.json());
app.use('/users', userRoutes); // Register user routes

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
