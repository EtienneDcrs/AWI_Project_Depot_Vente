import express from "express";
import Report from "../models/Report.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allTransactions = await Transaction.find();
        
    
    
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching transactions" });
    }
});


export default router;