import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'gerant'] },
});

const Worker = mongoose.model('Worker', workerSchema, 'Worker');
export default Worker;