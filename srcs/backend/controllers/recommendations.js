const User = require("../models/user");

const getRecommendations = async (req, res) => {
    const user_id = req.user_id;
    const limit = parseInt(req.query.limit) || 1;
    const afterId = req.query.after; // optional, for pagination

    try {
        const profiles = await User.getUserProfiles(user_id, limit);
        // if (!profiles)
        //     return res.status(404).json({ message: 'No profiles found' });

        // Filter out profiles that the user has already liked

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getRecommendations,
};
