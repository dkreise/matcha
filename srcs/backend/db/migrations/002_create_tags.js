module.exports.up = async (pool) => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        );
    `);

    await pool.query(`
        INSERT INTO tags (name)
        VALUES 
          ('vegan'),
          ('geek'),
          ('music'),
          ('travel'),
          ('sport'),
          ('piercing'),
          ('tattoos'),
          ('introvert'),
          ('extrovert'),
          ('gamer'),
          ('reader'),
          ('coffee'),
          ('tea'),
          ('coding'),
          ('matcha'),
          ('photography'),
          ('art'),
          ('nature'),
          ('fashion'),
          ('pets'),
          ('movies'),
          ('hiking'),
          ('yoga'),
          ('fitness'),
          ('cooking'),
          ('dancing'),
          ('writing'),
          ('swimming')
        ON CONFLICT (name) DO NOTHING;
    `);
};
