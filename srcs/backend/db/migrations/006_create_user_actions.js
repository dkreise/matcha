module.exports.up = async (pool) => {
    await pool.query(`
        CREATE TABLE user_actions (
            id SERIAL PRIMARY KEY,
            actor_id INTEGER NOT NULL REFERENCES users(id),
            target_id INTEGER NOT NULL REFERENCES users(id),
            action_type TEXT NOT NULL CHECK (action_type IN ('like', 'skip', 'report')),
            meta JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};