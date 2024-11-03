import express from 'express';
import Buyer from '../models/Buyer.js';

const router = express.Router();

// Get all buyers
router.get('/', async (req, res) => {
    try {
        const buyers = await Buyer.find();
        res.json(buyers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buyers' });
    }
});

// Get buyer by email, if no buyer return nothing
router.get('/email/:email', async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ email: req.params.email });
        if (buyer) {
            res.json(buyer);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buyer' });
    }
});

// Get a single buyer
router.get('/:id', async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ id: req.params.id });
        if (buyer) {
            res.json(buyer);
        } else {
            res.status(404).json({ message: 'Buyer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buyer' });
    }
});

// Add a new buyer
router.post('/', async (req, res) => {
    const newBuyer = new Buyer(req.body);
    try {
        await newBuyer.save();
        res.status(201).json(newBuyer);
    } catch (error) {
        res.status(400).json({ message: 'Error adding buyer' });
    }
});

export default router;
