const getRandomTags = (allTags, count) => {
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

module.exports.up = async (pool) => {
    try {
        // Get all tag IDs
        const tagsResult = await pool.query(`SELECT id FROM tags`);
        const allTagIds = tagsResult.rows.map(row => row.id);

        if (allTagIds.length === 0) {
            console.log("❌ No tags found in the database.");
            return;
        }

        for (let userId = 1; userId <= 21; userId++) {
            const tagCount = Math.floor(Math.random() * 5) + 3; // 3–7 tags
            const selectedTags = getRandomTags(allTagIds, tagCount);

            for (const tagId of selectedTags) {
                await pool.query(
                    `INSERT INTO user_tags (user_id, tag_id) VALUES ($1, $2)`,
                    [userId, tagId]
                );
            }

            console.log(`✅ Assigned ${tagCount} tags to user ${userId}`);
        }

        console.log("🎉 Finished assigning random tags to users.");
    } catch (err) {
        console.error("❌ Error assigning tags:", err);
    }
};
