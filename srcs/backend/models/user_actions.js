const pool = require("../db/index");

const UserActions = {
    async createAction(actorId, targetId, actionType) {
        const result = await pool.query(
            "INSERT INTO user_actions (actor_id, target_id, action_type) VALUES ($1, $2, $3) RETURNING *",
            [actorId, targetId, actionType]
        );
        return result.rows[0];
    },

    async createLike(actorId, targetId) {
        const result = await pool.query(
            "INSERT INTO user_actions (actor_id, target_id, action_type) VALUES ($1, $2, 'like') RETURNING *",
            [actorId, targetId]
        );
        return result.rows[0];
    },

    async createSkip(actorId, targetId) {
        const result = await pool.query(
            "INSERT INTO user_actions (actor_id, target_id, action_type) VALUES ($1, $2, 'skip') RETURNING *",
            [actorId, targetId]
        );
        return result.rows[0];
    },

    async deleteLike(actorId, targetId) {
        const result = await pool.query(
            "DELETE FROM user_actions WHERE actor_id = $1 AND target_id = $2 AND action_type = 'like' RETURNING *",
            [actorId, targetId]
        );
        return result.rows[0];
    },
};

module.exports = UserActions;
