const express = require('express');
const router = express.Router();

let users = []; // In-memory data structure to hold user data.

// Create new user
router.post('/users', (req, res) => {
    const newUser = { id: Date.now(), ...req.body }; // Simple ID generation
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get all users
router.get('/users', (req, res) => {
    res.json(users);
});

// Update existing user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) {
        users[index] = { id: users[index].id, ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id != id);
    res.status(204).send(); // No content
});

// Block user (you might want to implement this differently based on your logic)
router.patch('/users/:id/block', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) {
        users[index].blocked = true;
        res.json(users[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;
