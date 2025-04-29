// const pool = require("../db/index");
const User = require("../models/user");
const Tags = require("../models/tags");

const associateTags = async (req, res) => {
    const { tag_name } = req.body;
    const username = req.user;

    try {
        const user = await User.getUserByUsername(username);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        let tag = await Tags.getTagByName(tag_name);
        if (!tag) {
            // If the tag doesn't exist, create it
            const newTag = await Tags.createTag(tag_name);
            tag = newTag;
        }
        // Associate the tag with the user
        await Tags.associateTagWithUser(tag.id, user.id);
        return res.status(200).json(tag);
    } catch (err) {
        console.error("Error creating tag and associating with user:", err);
        res.status(500).json({ message: "Error creating tag and associating with user" });
    }
};

module.exports = { associateTags };
  