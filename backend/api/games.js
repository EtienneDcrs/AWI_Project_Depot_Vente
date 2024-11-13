import express from "express";
import Game from "../models/Game.js";
import Seller from "../models/Seller.js";

const router = express.Router();

// Get all games
router.get("/", async (req, res) => {
    try {
        const games = await Game.find();
        return res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games" });
    }
});

// Get the id of the last game in database (string) and increment + 1
router.get("/nextid", async (req, res) => {
    try {
        // Utilise `aggregate` pour obtenir le maximum des IDs existants
        const result = await Game.aggregate([
            { $group: { _id: null, maxId: { $max: { $toInt: "$id" } } } },
        ]);

        const maxId = result[0]?.maxId || 0;
        const nextId = maxId + 1;

        return res.json(nextId.toString());
    } catch (error) {
        res.status(500).json({ message: "Error fetching the last game id" });
    }
});

// Get all games that have the status 'stock'
router.get("/stock", async (req, res) => {
    try {
        const games = await Game.find({ status: "stock" });
        return res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games in stock" });
    }
});

// Get all games that have the status 'vendu'
router.get("/sold", async (req, res) => {
    try {
        const games = await Game.find({ status: "vendu" });
        return res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games in sold" });
    }
});

// Get all games that have the status 'rayon'
router.get("/rayon", async (req, res) => {
    try {
        const games = await Game.find({ status: "rayon" });
        return res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games in rayon" });
    }
});

// Get a game by id
router.get("/:id", async (req, res) => {
    try {
        const game = await Game.findOne({ id: req.params.id });
        return res.json(game);
    } catch (error) {
        res.status(404).json({ message: "Game not found" });
    }
});

// Add a new game
router.post("/", async (req, res) => {
    const newGame = new Game(req.body);
    try {
        await newGame.save();
        return res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: "Error adding game" });
    }
});

// Update a game
router.put("/:id", async (req, res) => {
    try {
        console.log("req", req.body);
        const updatedGame = await Game.findOneAndUpdate(
            { id: req.params.id }, // Cherche par `id` personnalisé au lieu de `_id`
            req.body,
            { new: true }
        );
        if (updatedGame) {
            if (req.body.status === "retiré") {
                console.log("gameId", updatedGame.id);
                console.log("sellerId", updatedGame.sellerId);
                const seller = await Seller.findOne({
                    id: updatedGame.sellerId,
                });
                console.log("seller", seller);
                if (seller) {
                    // Recherche l'id du jeu dans le tableau `stocks` du vendeur et l'enlever si trouvé
                    const index = seller.stocks.indexOf(updatedGame.id);
                    if (index !== -1) {
                        // enleve le jeu du tableau
                        seller.stocks.splice(index, 1);
                    }
                    await seller.save();
                }
            }

            return res.json(updatedGame);
        } else {
            console.log("Game not found");
            return res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.log("Error updating game", error);
        res.status(400).json({ message: "Error updating game" });
    }
});


// Sell a game
router.post("/:id/vendu", async (req, res) => {
    try {
        const soldGame = await Game.findOne({ id: req.params.id });
            
        if (soldGame) {
            soldGame.status = "vendu";
            console.log("soldGame", soldGame);
            await soldGame.save();
            return res.json(soldGame);
        } else {
            return res.status(404).json({ message: "Game not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error selling game" });
    }
});

// Delete a game
router.delete("/:id", async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        return res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: "Error deleting game" });
    }
});

export default router;