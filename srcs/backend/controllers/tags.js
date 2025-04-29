const pool = require("../db/index");

// const getUserTags = async (username) => {
//     // const username = req.user;
//     try {
//         const user = await User.getUserByUsername(username);
//         // if (!user) return res.status(404).json({ message: 'User not found' });
//         // res.json({
//         //     id: user.id,
//         //     username: user.username,
//         //     first_name: user.first_name,
//         //     email: user.email,
//         // });
//         const userId = user.id;
//         const result = await pool.query(`
//             SELECT t.id, t.name
//             FROM tags t
//             JOIN user_tags ut ON ut.tag_id = t.id
//             WHERE ut.user_id = $1
//           `, [userId]);
        
//         // res.json(result.rows);
//         return result.rows;
//     } catch (err) {
//         // res.status(500).json({ error: err.message });
//     }
// };

// module.exports = { getUserTags };
  