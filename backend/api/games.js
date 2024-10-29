import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games' });
    }
});

// Get the id of the last game in database (string) and increment + 1 
router.get('/nextid', async (req, res) => {
    try {
        const lastGame = await Game.findOne().sort({ id: -1 });
        if (lastGame) {
            const nextId = parseInt(lastGame.id) + 1;
            res.json(nextId.toString());
        } else {
            res.json('1');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the last game id' });
    }
});


// Get a game by id
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findOne({ id: req.params.id });
        res.json(game);
    } catch (error) {
        res.status(404).json({ message: 'Game not found' });
    }
});

// Add a new game
router.post('/', async (req, res) => {
    const newGame = new Game(req.body);
    try {
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: 'Error adding game' });
    }
});

// Update a game
router.put('/:id', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: 'Error updating game' });
    }
});

// Delete a game
router.delete('/:id', async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting game' });
    }
});

export default router;
