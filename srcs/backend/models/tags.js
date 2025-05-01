const pool = require("../db/index");

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
    }
    

    // TODO: the contrary function: get all users with a tag
    // async getUserTags(userId) {
    //     const result = await pool.query(`
    //         SELECT t.id, t.name
    //         FROM tags t
    //         JOIN user_tags ut ON ut.tag_id = t.id
    //         WHERE ut.user_id = $1
    //       `, [userId]);
    //     return result.rows;
    // },
};

module.exports = Tags;
