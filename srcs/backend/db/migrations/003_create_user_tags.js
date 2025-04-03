module.exports.up = async (pool) => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS user_tags (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            tag_id INT REFERENCES tags(id) ON DELETE CASCADE
        );
    `);
};
