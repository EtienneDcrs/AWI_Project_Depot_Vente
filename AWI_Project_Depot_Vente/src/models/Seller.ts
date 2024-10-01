import { Game } from "./Game";
import { User } from "./User";

export class Seller extends User {
    stock!: Game[];
    sales: Game[] = [];
    turnover: number = 0;

    constructor(name: string, email: string, phone: string, stock: Game[]) {
        super(name, email, phone); // Call the constructor of the superclass
        this.stock = stock;
    }

    public getStock(): Game[] {
        return this.stock;
    }

    public getSales(): Game[] {
        return this.sales;
    }

    public getTurnover(): number {
        return this.turnover;
    }

    public addGameToStock(game: Game): void {
        this.stock.push(game);
    }

    public removeGameFromStock(game: Game): void {
        // Remove the game by filtering it out
        this.stock = this.stock.filter(g => g.getId() !== game.id);
    }
    
    public sellGame(game: Game): void {
        // Add the game to the sales list, remove it from the stock and update the turnover
        this.sales.push(game);
        this.turnover += game.getPrice();
        this.stock = this.stock.filter(g => g.getId() !== game.id);
    }

}