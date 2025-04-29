const User = require("../models/user");

const getProfileData = async (req, res) => {
    const username = req.user;
    try {
        const user = await User.getUserByUsername(username);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        
        const tags = await User.getUserTags(user.id);
        res.json({
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            email: user.email,
            tags: tags,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProfileData,
};
