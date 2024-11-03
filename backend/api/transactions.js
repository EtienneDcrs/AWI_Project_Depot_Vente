import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

// Add a new transaction
router.post('/', async (req, res) => {

    const transaction = new Transaction({
        game: req.body.game,
        buyerId: req.body.buyerId,
        buyerName: req.body.buyerName,
        date: req.body.date,
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: 'Error creating transaction' });
    }
});



export default router;
