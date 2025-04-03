const pool = require("../db/index");
const bcrypt = require('bcrypt');

const User = {
  async createUser(username, email, passwordHash) {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, passwordHash]
    );
    return result.rows[0];
  },

  async getUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async getUserByUsername(username) {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  },
  
  async updateUser(id, newUsername) {
    const result = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
      [newUsername, id]
    );
    return result.rows[0];
  },

  async deleteUser(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  async verifyPassword(user, password) {
    // if false -> wrong password
    return bcrypt.compareSync(password, user.password)
    // return user.password === password; // Placeholder
  },
};

module.exports = User;
