import mongoose, { mongo } from "mongoose";

//transaction schema
const transactionSchema = new mongoose.Schema({
    game: { type: String, required: true },
    buyerId: { type: String, required: false },
    buyerName: { type: String, required: false },
    sellerId: { type: String, required: true },
    sellerName: { type: String, required: true },
    date: { type: Date, required: true },
});

const Transaction = mongoose.model(
    "Transaction",
    transactionSchema,
    "Transaction"
);
export default Transaction;