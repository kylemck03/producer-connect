const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import database connection

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a new user
router.post('/', async (req, res) => {
    try {
        const { name, email, password, bio, skills } = req.body;
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, bio, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, password, bio, skills] 
        );
        res.json(newUser,rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;