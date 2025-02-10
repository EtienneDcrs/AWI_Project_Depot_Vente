import { GameService } from "../app/services/game.service";
import { Game } from "./Game";
import { User } from "./User";

export class Seller extends User {
    stocks!: string[];
    sales: Game[] = [];
    turnover: number = 0;

    constructor(firstName: string, name: string, email: string, phone: string, stocks: string[]) {
        super(firstName, name, email, phone); // Call the constructor of the superclass
        this.stocks = stocks;
        this.turnover = 0;
    }

    public getStock(): string[] {
        return this.stocks;
    }

    public getSales(): Game[] {
        return this.sales;
    }

    public getTurnover(): number {
        return this.turnover;
    }

    public addGameToStock(gameId: string): void {
        this.stocks.push(gameId);
    }

    public removeGameFromStock(game: Game): void {
        // Remove the game by filtering it out
        this.stocks = this.stocks.filter(g => g !== game.id);
    }

    public sellGame(game: Game): void {
        // Add the game to the sales list, remove it from the stock and update the turnover
        this.sales.push(game);
        this.turnover += game.getPrice();
        this.stocks = this.stocks.filter(g => g !== game.id);
    }

}