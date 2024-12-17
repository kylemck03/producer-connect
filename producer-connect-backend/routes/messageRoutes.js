const express = require('express');
const router = express.Router();
const pool = require('../db'); // Database connection

// Get all messages between two users
router.get('/:sender_id/:receiver_id', async (req, res) => {
    const { sender_id, receiver_id } = req.params;
    try {
        const messages = await pool.query(
            `SELECT * FROM messages
             WHERE (sender_id = $1 AND receiver_id = $2)
                OR (sender_id = $2 AND receiver_id = $1)
             ORDER BY created_at ASC`,
            [sender_id, receiver_id]
        );
        res.json(messages.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Send a new message
router.post('/', async (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try {
        const newMessage = await pool.query(
            'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
            [sender_id, receiver_id, content]
        );
        res.json(newMessage.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a message
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/api/message', (req, res) => {
    res.json({message: 'Welcome to ProducerConnect'})
});

module.exports = router;
