import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    editor: { type: String, required: true },
    price: { type: Number, required: true },
    sellerId: { type: String, required: true },
    sellerName: { type: String, required: true },
    status: { type: String, required: true },
});

const Game = mongoose.model('Game', gameSchema, 'Game');
export default Game;
