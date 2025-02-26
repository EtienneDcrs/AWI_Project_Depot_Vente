import express from "express";
import Buyer from "../models/Buyer.js";

const router = express.Router();

// Get all buyers
router.get("/", async (req, res) => {
    try {
        const buyers = await Buyer.find();
        return res.json(buyers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyers" });
    }
});

// Get buyer by email, if no buyer return nothing
router.get("/email/:email", async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ email: req.params.email });
        if (buyer) {
            return res.json(buyer);
        } else {
            return res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyer" });
    }
});

// Get a single buyer
router.get("/:id", async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ id: req.params.id });
        if (buyer) {
            return res.json(buyer);
        } else {
            return res.status(404).json({ message: "Buyer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyer" });
    }
});

// Rechercher des vendeurs par prénom ou nom
router.get("/search", async (req, res) => {
    const { search } = req.query;

    // Vérifier si le paramètre de recherche est présent
    if (!search) {
        return res
            .status(400)
            .json({ message: "Search parameter is required" });
    }

    try {
        const buyers = await Buyer.find({
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
            ],
        });

        if (buyers.length === 0) {
            return res.status(404).json({
                message: "No sellers found matching the search criteria",
            });
        }

        res.json(buyers);
    } catch (error) {
        res.status(500).json({ message: "Error searching for sellers" });
    }
});

// Add a new buyer
router.post("/", async (req, res) => {
    const newBuyer = new Buyer(req.body);
    try {
        await newBuyer.save();
        return res.status(201).json(newBuyer);
    } catch (error) {
        res.status(400).json({ message: "Error adding buyer" });
    }
});

export default router;