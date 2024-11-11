import mongoose from "mongoose";

//Report schema
const ReportSchema = new mongoose.Schema({
    totalSales: { type: Number, required: true },
    totalEarnings: { type: Number, required: true },
    totalStock: { type: Number, required: true },
    totalGames: { type: Number, required: true },
    totalBuyers: { type: Number, required: true },
    totalSellers: { type: Number, required: true },
    totalTransactions: { type: Number, required: true },
    
});

const Report = mongoose.model(
    "Report",
    ReportSchema,
    "Report"
);
export default Report;