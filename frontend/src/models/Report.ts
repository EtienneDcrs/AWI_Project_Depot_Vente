export class Report {
    totalSales: number;
    amountToReimburse: number;
    amountReimbursed: number;
    gamesSoldNumber: number;
    gamesInStockNumber: number;
    potentialSales: number;
    commissionsEarnings: number;
    depositEarnings: number;
    totalEarnings: number;
    totalBuyers: number;
    totalSellers: number;

    constructor(
        totalSales: number,
        amountToReimburse: number,
        amountReimbursed: number,
        gamesSoldNumber: number,
        gamesInStockNumber: number,
        potentialSales: number,
        commissionsEarnings: number,
        depositEarnings: number,
        totalEarnings: number,
        totalBuyers: number,
        totalSellers: number
    ) {
        this.totalSales = totalSales;
        this.amountToReimburse = amountToReimburse;
        this.amountReimbursed = amountReimbursed;
        this.gamesSoldNumber = gamesSoldNumber;
        this.gamesInStockNumber = gamesInStockNumber;
        this.potentialSales = potentialSales;
        this.commissionsEarnings = commissionsEarnings;
        this.depositEarnings = depositEarnings;
        this.totalEarnings = totalEarnings;
        this.totalBuyers = totalBuyers;
        this.totalSellers = totalSellers;
    }

    getTotalSales(): number {
        return this.totalSales;
    }

    getAmountToReimburse(): number {
        return this.amountToReimburse;
    }

    getAmountReimbursed(): number {
        return this.amountReimbursed;
    }

    getGamesSoldNumber(): number {
        return this.gamesSoldNumber;
    }

    getGamesInStockNumber(): number {
        return this.gamesInStockNumber;
    }

    getPotentialSales(): number {
        return this.potentialSales;
    }

    getCommissionsEarnings(): number {
        return this.commissionsEarnings;
    }

    getDepositEarnings(): number {
        return this.depositEarnings;
    }

    getTotalEarnings(): number {
        return this.totalEarnings;
    }

    getTotalBuyers(): number {
        return this.totalBuyers;
    }

    getTotalSellers(): number {
        return this.totalSellers;
    }
}