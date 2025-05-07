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

const getInterestedUsers = async (req, res) => {
    const user_id = req.user_id;

    try {
        const interestedUsers = await UserActions.getLikesByTargetId(user_id);
        res.json(interestedUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserActivity = async (req, res) => {
    const user_id = req.user_id;

    try {
        const activity = await UserActions.getAllActionsByActorId(user_id);
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    makeAction,
    getInterestedUsers,
    getUserActivity,
};
