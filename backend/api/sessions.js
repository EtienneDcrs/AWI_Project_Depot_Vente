import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// Add a session
router.post("/", async (req, res) => {
    const newSession = new Session(req.body);
    try {
        await newSession.save();
        return res.status(201).json(newSession);
    } catch (error) {
        res.status(400).json({ message: "Error adding session" });
    }
});

// Get the last session id
router.get("/lastId", async (req, res) => {
    try {
        // Utilise `aggregate` pour obtenir le maximum des IDs existants
        const result = await Session.aggregate([
            { $group: { _id: null, maxId: { $max: { $toInt: "$id" } } } },
        ]);

        const maxId = result[0]?.maxId || 0;

        return res.json(maxId.toString());
    } catch (error) {
        res.status(500).json({ message: "Error fetching the last game id" });
    }
});

// Get the depositFee of a session
router.get("/depositFee/:id", async (req, res) => {
    try {
        const session = await Session.findOne({ id: req.params.id });
        if (session) {
            return res.json(session.depositFee);
        } else {
            return res.status(404).json({ message: "Session not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching session" });
    }
});

// Get the commission of a session
router.get("/commission/:id", async (req, res) => {
    try {
        const session = await Session.findOne({ id: req.params.id });
        if (session) {
            return res.json(session.commission);
        } else {
            return res.status(404).json({ message: "Session not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching session" });
    }
});

// Get a specific session
router.get("/:id", async (req, res) => {
    try {
        const session = await Session.findOne({ id: req.params.id });
        if (session) {
            return res.json(session);
        } else {
            return res.status(404).json({ message: "Session not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching session" });
    }
});

// Get all sessions
router.get("/", async (req, res) => {
    try {
        const sessions = await Session.find();
        return res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sessions" });
    }
});

// Update a session
router.put("/:id", async (req, res) => {
    try {
        const session = await Session.findOne({ id: req.params.id });
        if (session) {
            session.set(req.body);
            await session.save();
            return res.json(session);
        } else {
            return res.status(404).json({ message: "Session not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating session" });
    }
});

// Delete a session
router.delete("/:id", async (req, res) => {
    try {
        const result = await Session.deleteOne({ id: req.params.id });
        if (result.deletedCount > 0) {
            return res.json({ message: "Session deleted" });
        } else {
            return res.status(404).json({ message: "Session not found" });
        }
    } catch (error) {
        console.error("Error deleting session:", error); // Ajoutez des logs
        res.status(500).json({ message: "Error deleting session", error });
    }
});


export default router;

