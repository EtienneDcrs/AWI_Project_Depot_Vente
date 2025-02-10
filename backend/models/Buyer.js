import mongoose from 'mongoose';

//buyer schema
const buyerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
});

const Buyer = mongoose.model('Buyer', buyerSchema, 'Buyer');
export default Buyer;