import express from "express";
import Transaction from "../models/Transaction.js";
import Seller from "../models/Seller.js";

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions" });
    }
});

// Add a new transaction
router.post("/", async (req, res) => {
    const transaction = new Transaction({
        game: req.body.game,
        buyerId: req.body.buyerId,
        buyerName: req.body.buyerName,
        sellerId: req.body.sellerId,
        sellerName: req.body.sellerName,
        date: req.body.date,
    });
    console.log("transaction", transaction);
    try {
        const newTransaction = await transaction.save();
        // Remove the game from the seller's stock
        const seller = await Seller.findOne({ id: req.body.sellerId });
        if (seller) {
            seller.stocks = seller.stocks.filter(
                (stock) => stock !== req.body.game
            );
            seller.sales.push(req.body.game);
            await seller.save();
            return res.status(201).json(newTransaction);
        } else {
            return res.status(404).json({ message: "Seller not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error creating transaction" });
    }
});

export default router;