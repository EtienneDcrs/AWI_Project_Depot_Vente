import mongoose, { mongo } from 'mongoose';
import Game from './Game.js';

//transaction schema
const transactionSchema = new mongoose.Schema({
    game: { type: String, required: true },
    buyerId: { type: String, required: false },
    buyerName: { type: String, required: false },
    date: { type: Date, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'Transaction');
export default Transaction;
