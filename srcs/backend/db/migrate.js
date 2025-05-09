const pool = require('./index');
const fs = require('fs');
const path = require('path');

async function waitForDB(retries = 20, delay = 5000) {
    while (retries > 0) {
        try {
            await pool.query('SELECT 1'); // test query
            console.log('✅ Database is ready.');
            return;
        } catch (err) {
            console.log(`⏳ Waiting for database... (${retries} retries left)`);
            retries--;
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error("❌ Could not connect to the database after multiple attempts.");
}

async function runMigrations() {
    try {
        await waitForDB();
        // Ensure migrations table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Get executed migrations
        const result = await pool.query(`SELECT name FROM migrations`);
        const executedMigrations = result.rows.map(row => row.name);

        // Get all migration files
        const migrationsDir = path.join(__dirname, 'migrations');
        const files = fs.readdirSync(migrationsDir).sort(); // Ensure order

        for (const file of files) {
            if (!executedMigrations.includes(file)) {
                console.log(`🚀 Running migration: ${file}`);

                const migration = require(path.join(migrationsDir, file));
                await migration.up(pool);

                await pool.query(`INSERT INTO migrations (name) VALUES ($1)`, [file]);
                console.log(`✅ Migration completed: ${file}`);
            }
        }

        console.log('✅ All migrations executed.');
    } catch (err) {
        console.error('❌ Error running migrations:', err);
    }
}

runMigrations();

// docker exec -it matcha-backend node db/migrate.js
// This executes migrations.js inside the matcha-backend container.

// docker exec -it matcha-db psql -U matcha_user -d matcha_db
// DELETE FROM tags WHERE id = 5;

