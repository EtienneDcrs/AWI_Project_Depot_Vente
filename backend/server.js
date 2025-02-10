import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import games from "./api/games.js";
import transactions from "./api/transactions.js";
import sellers from "./api/sellers.js";
import buyers from "./api/buyers.js";
import stocks from "./api/stocks.js";
import report from "./api/report.js";
import sessions from "./api/sessions.js";
import workers from "./api/workers.js";
import auth from "./api/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Add authentication routes
app.use("/api/auth", auth);

app.use("/api/games", games);
app.use("/api/transactions", transactions);
app.use("/api/sellers", sellers);
app.use("/api/buyers", buyers);
app.use("/api/stocks", stocks);
app.use("/api/report", report);
app.use("/api/sessions", sessions);
app.use("/api/workers", workers);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
