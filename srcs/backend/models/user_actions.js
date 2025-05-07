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
        const result = await pool.query(`
            SELECT * FROM user_actions 
            WHERE actor_id = $1 AND action_type = $2 
            ORDER BY created_at DESC
            `, [actorId, actionType]
        );
        return result.rows;
    },

    async getAllActionsByActorId(actorId) {
        const result = await pool.query(`
            SELECT 
                user_actions.*,
                users.id AS target_user_id,
                users.first_name AS target_name,
                users.profile_picture AS target_profile_picture
            FROM user_actions
            JOIN users ON users.id = user_actions.target_id
            WHERE user_actions.actor_id = $1
            ORDER BY user_actions.created_at DESC
            `, [actorId]
        );
        return result.rows;
    },

    async getLikesByTargetId(targetId) {
        const result = await pool.query(`
            SELECT
                ua.*, 
                u.first_name, 
                u.last_name, 
                u.profile_picture,
                EXISTS (
                    SELECT 1 
                    FROM user_actions ua2 
                    WHERE ua2.actor_id = ua.target_id 
                    AND ua2.target_id = ua.actor_id 
                    AND ua2.action_type = 'like'
                ) AS match
            FROM user_actions ua
            JOIN users u ON ua.actor_id = u.id
            WHERE ua.target_id = $1 AND ua.action_type = 'like'
            ORDER BY ua.created_at DESC
            `, [targetId]
        );
        return result.rows;
    },

    async likeExists(actorId, targetId) {
        const result = await pool.query(
            "SELECT * FROM user_actions WHERE actor_id = $1 AND target_id = $2 AND action_type = 'like'",
            [actorId, targetId]
        );
        return result.rows.length > 0;
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
