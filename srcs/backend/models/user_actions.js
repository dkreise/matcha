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
    
    async getActionsByActorId(actorId, actionType) {
        const result = await pool.query(
            "SELECT * FROM user_actions WHERE actor_id = $1 AND action_type = $2",
            [actorId, actionType]
        );
        return result.rows;
    },

    async getLikesByTargetId(targetId) {
        const result = await pool.query(
            "SELECT * FROM user_actions WHERE target_id = $1 AND action_type = 'like'",
            [targetId]
        );
        return result.rows;
    },

    async deleteLike(actorId, targetId) {
        const result = await pool.query(
            "DELETE FROM user_actions WHERE actor_id = $1 AND target_id = $2 AND action_type = 'like' RETURNING *",
            [actorId, targetId]
        );
        return result.rows[0];
    },

    async deleteSkips(actorId) {
        const result = await pool.query(
            "DELETE FROM user_actions WHERE actor_id = $1 AND action_type = 'skip' RETURNING *",
            [actorId]
        );
        return result.rows;
    },
};

module.exports = UserActions;
