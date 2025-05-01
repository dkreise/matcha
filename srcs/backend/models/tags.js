const pool = require("../db/index");
const { getUsers } = require("./user");

const Tags = {
    async createTag(tagName) {
        const result = await pool.query(
            "INSERT INTO tags (name) VALUES ($1) RETURNING *",
            [tagName]
        );
        return result.rows[0];
    },

    async getTags() {
        const result = await pool.query("SELECT * FROM tags");
        return result.rows;
    },

    async getTagByName(tagName) {
        const result = await pool.query(
            "SELECT * FROM tags WHERE name = $1",
            [tagName]
        );
        return result.rows[0];
    },

    async associateTagWithUser(tagId, userId) {
        await pool.query(
            "INSERT INTO user_tags (user_id, tag_id) VALUES ($1, $2)",
            [userId, tagId]
        );
    },

    async removeTagFromUser(tagId, userId) {
        await pool.query(
            "DELETE FROM user_tags WHERE user_id = $1 AND tag_id = $2",
            [userId, tagId]
        );
    },

    async deleteTag(tagId) {
        await pool.query("DELETE FROM tags WHERE id = $1", [tagId]);
    },

    // not needed maybe
    async getTagById(id) {
      const result = await pool.query("SELECT * FROM tags WHERE id = $1", [id]);
      return result.rows[0];
    },

    async getSharedTags(userId1, userId2) {
        const result = await pool.query(`
            SELECT t.id, t.name
            FROM tags t
            JOIN user_tags ut1 ON ut1.tag_id = t.id
            JOIN user_tags ut2 ON ut2.tag_id = t.id
            WHERE ut1.user_id = $1 AND ut2.user_id = $2
        `, [userId1, userId2]);
    
        return result.rows;
    },
    
    async getUsersWithTag(tagId) {
        const result = await pool.query(`
            SELECT user_id
            FROM user_tags
            WHERE tag_id = $1
        `, [tagId]);
        return result.rows;
    }
};

module.exports = Tags;
