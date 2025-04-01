const pool = require('./index'); // Import database connection

// Get all users
async function getUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

// Get a user by ID
async function getUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

// Create a new user
async function createUser(username, email) {
    const result = await pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
        [username, email]
    );
    return result.rows[0];
}

module.exports = { getUsers, getUserById, createUser };
