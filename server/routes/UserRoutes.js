const express = require('express');
import User from '../models/User.js';

const app = express();
app.use(express.json()); 

app.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body); // Creating a user with the data from the request body
        res.json(user); // Responding with the created user
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err }); // Handling errors
    }
});

export default router;