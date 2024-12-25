import mongoose from "mongoose";

//session schema
const sessionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    endDepositGame: { type: Date, required: true },
    commissionType: { type: String, required: true },
    commission: { type: Number, required: true },
    depositFeeType: { type: String, required: true },
    depositFee: { type: Number, required: true },
});

const Session = mongoose.model("Session", sessionSchema, "Session");
export default Session;
