const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

module.exports.up = async (pool) => {
    try {
        const genders = ["male", "female", "non-binary"];
        const preferences = ["male", "female", "both", "all", "non-binary"];

        for (let i = 0; i < 20; i++) {
            const gender = faker.helpers.arrayElement(genders);
            const firstName = faker.person.firstName(gender);
            const lastName = faker.person.lastName();
            const username = faker.internet.username(); // ensure uniqueness
            const email = faker.internet.email(firstName, lastName).toLowerCase();
            const password = await bcrypt.hash("password123", 10);
            const bio = faker.lorem.paragraph();
            const profilePicture = faker.image.avatar();
            const fameRating = faker.number.int({ min: 0, max: 100 });
            const gpsLat = faker.location.latitude({ max: 90, min: -90, maxDecimalPlaces: 6 });
            const gpsLon = faker.location.longitude({ max: 180, min: -180, maxDecimalPlaces: 6 });
            const lastLogin = faker.date.recent();

            const sexualPreference = faker.helpers.arrayElement(preferences);

            await pool.query(
                `INSERT INTO users (
                    username, email, first_name, last_name, password,
                    gender, sexual_preferences, bio, profile_picture,
                    fame_rating, gps_lat, gps_lon, last_login
                ) VALUES (
                    $1, $2, $3, $4, $5,
                    $6, $7, $8, $9,
                    $10, $11, $12, $13
                )`,
                [
                    username, email, firstName, lastName, password,
                    gender, sexualPreference, bio, profilePicture,
                    fameRating, gpsLat, gpsLon, lastLogin
                ]
            );
        }

        console.log("✅ Seeded 20 random users");
    } catch (err) {
        console.error("❌ Error seeding users:", err);
    }
};
