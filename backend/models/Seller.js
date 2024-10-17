import mongoose from 'mongoose';

//seller schema
const sellerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    stocks: { type: [String], required: false },
    sales: { type: [String], required: false },
    turnover: { type: Number, required: false },
});

const Seller = mongoose.model('Seller', sellerSchema, 'Seller');
export default Seller;