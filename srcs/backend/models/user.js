const pool = require("../db/index");
const bcrypt = require('bcrypt');

const User = {
    async createUser(username, first_name, email, password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "INSERT INTO users (username, first_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [username,first_name, email, hashedPassword]
      );
      return result.rows[0];
    },

    async getUsers() {
      const result = await pool.query("SELECT * FROM users");
      return result.rows;
    },

    async getUserProfiles(id, limit, afterId = null) {
      let query = `
          SELECT id, first_name, bio, fame_rating 
          FROM users 
          WHERE id != $1 
          ${afterId ? `AND id > $2` : ''} 
          ORDER BY id 
          LIMIT $${afterId ? 3 : 2}
      `;
      const params = afterId ? [id, afterId, limit] : [id, limit];
      const result = await pool.query(query, params);
      // const result = await pool.query(`
      //     SELECT id, first_name, bio, fame_rating 
      //     FROM users 
      //     WHERE id != $1 
      //     LIMIT $2
      //   `,
      //   [id, limit]
      // );
      return result.rows;
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

    async updateUserProfile(id, username, first_name, last_name, email, bio) {
      const result = await pool.query(
        "UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4, bio = $5 WHERE id = $6 RETURNING *",
        [username, first_name, last_name, email, bio, id]
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

    async getUserTags(userId) {
        const result = await pool.query(`
            SELECT t.id, t.name
            FROM tags t
            JOIN user_tags ut ON ut.tag_id = t.id
            WHERE ut.user_id = $1
          `, [userId]);
        return result.rows;
    },
};

module.exports = User;
