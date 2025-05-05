// const User = require("../models/user");
const UserActions = require("../models/user_actions");

const makeAction = async (req, res) => {
    const user_id = req.user_id;
    const target_id = req.params.target_id;
    const action_type = req.params.action_type;

    try {
        let action;
        if (action_type === "like") {
            action = await UserActions.createLike(user_id, target_id);
        } else if (action_type === "skip") {
            action = await UserActions.createSkip(user_id, target_id);
        } else if (action_type === "unlike") {
            action = await UserActions.deleteLike(user_id, target_id);
        } else {
            return res.status(400).json({ message: "Invalid action type" });
        }

        res.status(200).json(action);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// const getRecommendations = async (req, res) => {
//     const user_id = req.user_id;
//     const limit = parseInt(req.query.limit) || 1;
//     const afterId = req.query.after; // optional, for pagination

//     try {
//         const profiles = await User.getUserProfiles(user_id, limit, afterId);
//         // if (!profiles)
//         //     return res.status(404).json({ message: 'No profiles found' });

//         // Filter out profiles that the user has already liked

//         res.json(profiles);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const getSharedTags = async (req, res) => {
//     const user_id = req.user_id;
//     const target_id = req.params.target_id;

//     try {
//         const tags = await Tags.getSharedTags(user_id, target_id);
//         res.json(tags);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

module.exports = {
    makeAction,
};
