import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const report = await Report.find();
        return res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Error fetching report" });
    }
});


export default router;