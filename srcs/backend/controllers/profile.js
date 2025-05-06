const User = require("../models/user");
const UserActions = require("../models/user_actions");

const getProfileData = async (req, res) => {
    const user_id = req.user_id;
    try {
        const user = await User.getUserById(Number(user_id));
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        
        const tags = await User.getUserTags(user.id);
        
        res.json({
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            bio: user.bio,
            tags: tags,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfileData = async (req, res) => {
    const user_id = req.user_id;
    const { username, first_name, last_name, email, bio } = req.body;

    try {
        const user = await User.getUserById(Number(user_id));
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        await User.updateUserProfile(user.id, username, first_name, last_name, email, bio);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const resetSkippedProfiles = async (req, res) => {
    const user_id = req.user_id;

    try {
        const user = await User.getUserById(Number(user_id));
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        await UserActions.deleteSkips(user.id);
        res.status(200).json({ message: 'Skipped profiles reset successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProfileData,
    updateProfileData,
    resetSkippedProfiles,
};
