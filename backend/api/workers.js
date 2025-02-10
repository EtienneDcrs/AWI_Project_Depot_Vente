import express from "express";
import Worker from "../models/Worker.js";

const router = express.Router();

// Get all workers
router.get("/", async (req, res) => {
    try {
        const workers = await Worker.find();
        return res.json(workers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workers" });
    }
});

// Get worker by username
router.get("/username/:username", async (req, res) => {
    try {
        const worker = await Worker.findOne({ username: req.params.username });
        if (worker) {
            return res.json(worker);
        } else {
            return res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching worker" });
    }
});

// Get worker by id
router.get("/id/:id", async (req, res) => {
    try {
        const worker = await Worker.findOne({ id: req.params.id });
        if (worker) {
            return res.json(worker);
        } else {
            return res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching worker" });
    }
});

// Create a new worker
router.post("/", async (req, res) => {
    try {
        const worker = new Worker(req.body);
        await worker.save();
        return res.json(worker);
    } catch (error) {
        res.status(500).json({ message: "Error creating worker" });
    }
});

// Update a worker
router.put("/:id", async (req, res) => {
    try {
        const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(worker);
    } catch (error) {
        res.status(500).json({ message: "Error updating worker" });
    }
});

// Delete a worker
router.delete("/:id", async (req, res) => {
    try {
        await Worker.findByIdAndDelete(req.params.id);
        return res.json({ message: "Worker deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting worker" });
    }
});

export default router;