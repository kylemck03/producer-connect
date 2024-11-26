const express = require('express');
const router = express.Router();
const pool = require('../db'); // Database connection

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(projects.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a single project by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (project.rows.length === 0) {
            return res.status(404).send('Project not found');
        }
        res.json(project.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new project
router.post('/', async (req, res) => {
    const { title, description, creator_id, status } = req.body;
    try {
        const newProject = await pool.query(
            'INSERT INTO projects (title, description, creator_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, creator_id, status || 'In Progress']
        );
        res.json(newProject.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a project
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const updatedProject = await pool.query(
            'UPDATE projects SET title = $1, description = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
            [title, description, status, id]
        );
        if (updatedProject.rows.length === 0) {
            return res.status(404).send('Project not found');
        }
        res.json(updatedProject.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
