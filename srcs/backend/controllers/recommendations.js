const User = require("../models/user");
const Tags = require("../models/tags");

const getRecommendations = async (req, res) => {
    const user_id = req.user_id;
    const limit = parseInt(req.query.limit) || 1;
    const afterId = req.query.after; // optional, for pagination

    try {
        // const profiles = await User.getUserProfiles(user_id, limit, afterId);
        const profiles = await User.getUnseenUsers(user_id, limit);

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSharedTags = async (req, res) => {
    const user_id = req.user_id;
    const target_id = req.params.target_id;

    try {
        const tags = await Tags.getSharedTags(user_id, target_id);
        res.json(tags);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getRecommendations,
    getSharedTags,
};
