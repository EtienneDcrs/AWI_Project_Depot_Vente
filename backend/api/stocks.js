import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// Get all games in stock
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({ status: 'stock' });
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games in stock' });
    }
});

// Get a game by id in stock
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findOne({ id: req.params.id, status: 'stock' });
        if (!game) return res.status(404).json({ message: 'Game not found in stock' });
        res.json(game);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching game in stock' });
    }
});

// Add a game to stock
router.post('/', async (req, res) => {
    try {
        const game = new Game({ ...req.body, status: 'stock' });
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ message: 'Error adding game to stock' });
    }
});

// Update game status to 'rayon'
router.put('/:id/rayon', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            { status: 'rayon' },
            { new: true }
        );
        if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: 'Error updating game status to rayon' });
    }
});

// Update game status to 'vendu'
router.put('/:id/vendu', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            { status: 'vendu' },
            { new: true }
        );
        if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: 'Error updating game status to vendu' });
    }
});

// Remove a game from stock
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game || game.status !== 'stock') {
            return res.status(404).json({ message: 'Game not found in stock' });
        }
        await Game.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting game from stock' });
    }
});

export default router;
