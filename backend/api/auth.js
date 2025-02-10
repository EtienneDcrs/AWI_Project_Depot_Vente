import express from "express";
import Worker from "../models/Worker.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const worker = await Worker.findOne({ username, password });
        if (!worker) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password: omit, ...userResponse } = worker.toObject();

        return res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
});

export default router;