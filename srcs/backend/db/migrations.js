const pool = require('./index');

async function createTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Tables created successfully');
    } catch (err) {
        console.error('❌ Error creating tables:', err);
    }
}

// Run this function to apply migrations
createTables();


// docker exec -it matcha-backend node db/migrations.js
// This executes migrations.js inside the matcha-backend container.

// docker exec -it matcha-db psql -U matcha_user -d matcha_db


