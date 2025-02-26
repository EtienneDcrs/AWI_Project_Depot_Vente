import express from "express";
import Report from "../models/Report.js";
import Game from "../models/Game.js";
import Seller from "../models/Seller.js";
import Buyer from "../models/Buyer.js";
import Transaction from "../models/Transaction.js";
import Session from "../models/Session.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const gamesSold = await Game.find({
			status: { $in: ["vendu", "payé"] },
		});
		const gamesSoldNumber = gamesSold.length;
		const totalSales = gamesSold.reduce((sum, game) => sum + game.price, 0);
		const gamesToReimburse = await Game.find({ status: "vendu" });
		const amountToReimburse = gamesToReimburse
			.reduce(
				(sum, game) =>
					sum + (game.price - game.depositFee - game.commission),
				0
			)
			.toFixed(2);
		const gamesReimbursed = await Game.find({ status: "payé" });
		const amountReimbursed = gamesReimbursed
			.reduce(
				(sum, game) =>
					sum + (game.price - game.depositFee - game.commission),
				0
			)
			.toFixed(2);
		const gamesInStock = await Game.find({
			status: { $in: ["stock", "rayon"] },
		});
		const gamesInStockNumber = gamesInStock.length;
		const potentialSales = gamesInStock
			.reduce((sum, game) => sum + game.price, 0)
			.toFixed(2);
		const commissionsEarnings = gamesSold
			.reduce((sum, game) => sum + game.commission, 0)
			.toFixed(2);
		const depositEarnings = gamesSold
			.reduce((sum, game) => sum + game.depositFee, 0)
			.toFixed(2);

		const totalBuyers = (await Seller.find()).length;
		const totalSellers = (await Buyer.find()).length;

		const report = new Report({
			totalSales,
			amountToReimburse,
			amountReimbursed,
			gamesSoldNumber,
			gamesInStockNumber,
			potentialSales,
			commissionsEarnings,
			depositEarnings,
			totalEarnings: commissionsEarnings + depositEarnings,
			totalBuyers,
			totalSellers,
		});
		console.log("Report:", report);
		console.log("commissionsEarnings:", commissionsEarnings);
		console.log("depositEarnings:", depositEarnings);
		return res.json(report);
	} catch (error) {
		console.error("Error fetching report:", error);
		res.status(500).json({ message: "Error fetching report" });
	}
});

router.get("/session", async (req, res) => {
	try {
		const activeSession = await Session.findOne({
			startDate: { $lte: new Date() },
			endDate: { $gte: new Date() },
		});
		if (!activeSession) {
			return res.status(404).json({ message: "No active session" });
		}

		const gamesSold = await Game.find({
			status: { $in: ["vendu", "payé"] },
			sessionId: activeSession.id,
		});
		const gamesSoldNumber = gamesSold.length;
		const totalSales = gamesSold.reduce((sum, game) => sum + game.price, 0);
		const gamesToReimburse = await Game.find({
			status: "vendu",
			sessionId: activeSession.id,
		});
		const amountToReimburse = gamesToReimburse.reduce(
			(sum, game) =>
				sum + (game.price - game.depositFee - game.commission),
			0
		);
		const gamesReimbursed = await Game.find({
			status: "payé",
			sessionId: activeSession.id,
		});
		const amountReimbursed = gamesReimbursed.reduce(
			(sum, game) =>
				sum + (game.price - game.depositFee - game.commission),
			0
		);
		const gamesInStock = await Game.find({
			status: { $in: ["stock", "rayon"] },
			sessionId: activeSession.id,
		});
		const gamesInStockNumber = gamesInStock.length;
		const potentialSales = gamesInStock.reduce(
			(sum, game) => sum + game.price,
			0
		);
		const commissionsEarnings = gamesSold.reduce(
			(sum, game) => sum + game.commission,
			0
		);
		const depositEarnings = gamesSold.reduce(
			(sum, game) => sum + game.depositFee,
			0
		);

		const totalBuyers = (
			await Transaction.find({
				sessionId: activeSession.id,
				buyerId: { $exists: true },
			}).distinct("buyerId")
		).length;

		const totalSellers = (
			await Transaction.find({
				sessionId: activeSession.id,
			})
		).length;
		console.log("totalBuyers:", totalBuyers);
		console.log("totalSellers:", totalSellers);
		const report = new Report({
			totalSales,
			amountToReimburse,
			amountReimbursed,
			gamesSoldNumber,
			gamesInStockNumber,
			potentialSales,
			commissionsEarnings,
			depositEarnings,
			totalEarnings: commissionsEarnings + depositEarnings,
			totalBuyers,
			totalSellers,
		});
		console.log("Report:", report);
		console.log("commissionsEarnings:", commissionsEarnings);
		console.log("depositEarnings:", depositEarnings);
		return res.json(report);
	} catch (error) {
		console.error("Error fetching report:", error);
		res.status(500).json({ message: "Error fetching report" });
	}
});

export default router;
