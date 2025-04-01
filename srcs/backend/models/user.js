const pool = require("../db/index");

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
  
  async updateUser(id, newUsername) {
    const result = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
      [newUsername, id]
    );
    return result.rows[0];
  }
};

module.exports = User;
