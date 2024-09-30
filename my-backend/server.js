const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());  // To parse JSON bodies

const pool = new Pool({
    user: 'your-username',
    host: 'localhost',
    database: 'your-database',
    password: 'your-password',
    port: 5432,
});

// Route to get all games (already existing)
app.get('/games', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// New route to add a game
app.post('/games', async (req, res) => {
    const { name, price, seller_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO games (name, price, seller_id) VALUES ($1, $2, $3) RETURNING *',
            [name, price, seller_id]
        );
        res.json(result.rows[0]);  // Send back the newly created game
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
