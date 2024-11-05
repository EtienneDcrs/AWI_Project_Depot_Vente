import express from "express";
import Seller from "../models/Seller.js";
import Game from "../models/Game.js";

const router = express.Router();

// Get all sellers
router.get("/", async (req, res) => {
    try {
        const sellers = await Seller.find();
        return res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sellers" });
    }
});

// Get a single seller
router.get("/:id", async (req, res) => {
    try {
        const seller = await Seller.findOne({ id: req.params.id });
        if (seller) {
            return res.json(seller);
        } else {
            return res.status(404).json({ message: "Seller not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching seller" });
    }
});

// Get stocks of a single seller
router.get("/:id/stocks", async (req, res) => {
    try {
        const seller = await Seller.findOne({ id: req.params.id }); // Trouver le vendeur avec l'ID spécifié dans l'URL
        if (seller) {
            // Si le vendeur est trouvé
            const games = await Game.find({ id: { $in: seller.stocks } }); // Trouver les jeux correspondants aux stocks du vendeur
            if (games.length === 0) {
                return res.status(404).json({ message: "No games found" }); // Si aucun jeu n'est trouvé, retourner un message d'erreur
            }
            return res.json(games); // Retourner les jeux
        } else {
            return res.status(404).json({ message: "Seller not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching seller stocks" }); // Retourner un message d'erreur si une erreur se produit
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
        const sellers = await Seller.find({
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
            ],
        });

        if (sellers.length === 0) {
            return res.status(404).json({
                message: "No sellers found matching the search criteria",
            });
        }

        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error searching for sellers" });
    }
});

// Add a new seller
router.post("/", async (req, res) => {
    const newSeller = new Seller(req.body);
    try {
        await newSeller.save();
        return res.status(201).json(newSeller);
    } catch (error) {
        res.status(400).json({ message: "Error adding seller" });
    }
});

export default router;