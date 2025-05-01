// const pool = require("../db/index");
const User = require("../models/user");
const Tags = require("../models/tags");

const getAllTags = async (req, res) => {
    try {
        const tags = await Tags.getTags();
        res.status(200).json(tags);
    } catch (err) {
        console.error("Error fetching tags:", err);
        res.status(500).json({ message: "Error fetching tags" });
    }
};

const associateTags = async (req, res) => {
    const { tag_name } = req.body;
    const user_id = req.user_id;

    try {
        const user = await User.getUserById(Number(user_id));
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

const removeTag = async (req, res) => {
    const { tag_id } = req.params;
    const user_id = req.user_id;

    try {
        await Tags.removeTagFromUser(tag_id, user_id);
        res.status(200).json({ message: "Tag removed successfully" });
    } catch (err) {
        console.error("Error removing tag:", err);
        res.status(500).json({ message: "Error removing tag" });
    }
};

module.exports = { associateTags, getAllTags, removeTag };
  