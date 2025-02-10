import mongoose from "mongoose";

//Report schema
const ReportSchema = new mongoose.Schema({
    totalSales: { type: Number, required: true },
    gamesSoldNumber: { type: Number, required: true },
    gamesInStockNumber: { type: Number, required: true },
    potentialSales: { type: Number, required: true },
    commissionsEarnings: { type: Number, required: true },
    depositEarnings: { type: Number, required: true },
    totalBuyers: { type: Number, required: true },
    totalSellers: { type: Number, required: true },
});

const Report = mongoose.model("Report", ReportSchema, "Report");
export default Report;
