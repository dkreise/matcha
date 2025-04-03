const bcrypt = require('bcrypt');

module.exports.up = async (pool) => {
    try {
        // Create the users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50),
                password TEXT NOT NULL,
                gender VARCHAR(10),
                sexual_preferences VARCHAR(50),
                bio TEXT,
                profile_picture TEXT,
                fame_rating INT DEFAULT 0,
                gps_lat DECIMAL(9,6),
                gps_lon DECIMAL(9,6),
                last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Users table created");

        // Check if the admin user already exists
        const result = await pool.query(
            "SELECT id FROM users WHERE username = $1", 
            ["admin"]
        );

        if (result.rows.length === 0) {
            // Hash password before inserting
            const hashedPassword = await bcrypt.hash("admin123", 10);

            await pool.query(
                `INSERT INTO users (username, email, first_name, password) 
                 VALUES ($1, $2, $3, $4)`,
                ["admin", "admin@example.com", "Admin", hashedPassword]
            );

            console.log("✅ Admin user created");
        } else {
            console.log("ℹ️ Admin user already exists, skipping creation");
        }
    } catch (err) {
        console.error("❌ Error in migration:", err);
    }
};
