import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Game from './models/Game.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


// Get all games
app.get('/api/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games' });
    }
});

// Add a new game
app.post('/api/games', async (req, res) => {
    const newGame = new Game(req.body);
    try {
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: 'Error adding game' });
    }
});

// Update a game
app.put('/api/games/:id', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: 'Error updating game' });
    }
});

// Delete a game
app.delete('/api/games/:id', async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting game' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
