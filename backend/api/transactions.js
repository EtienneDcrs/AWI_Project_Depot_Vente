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
    const gameId = req.body.id;

    // Créez un objet de transaction avec les champs nécessaires
    const transactionData = {
        game: gameId,
        date: new Date(),
    };

    // Ajoutez buyerId et buyerName seulement s'ils sont fournis
    if (req.body.buyerId) {
        transactionData.buyerId = req.body.buyerId;
    }

    if (req.body.buyerName) {
        transactionData.buyerName = req.body.buyerName;
    }

    const transaction = new Transaction(transactionData);

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: 'Error creating transaction' });
    }
});



export default router;
