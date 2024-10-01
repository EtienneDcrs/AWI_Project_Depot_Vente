import { Game } from "./Game";
import { User } from "./User";

export class Seller extends User {
    stock!: Game[];
    sales: Game[] = [];
    turnover: number = 0;

    constructor(name: string, email: string, phone: string, stock: Game[]) {
        super(name, email, phone);
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

    public sellGame(game: Game): void {
        this.sales.push(game);
        this.turnover += game.getPrice();
        this.stock = this.stock.filter(g => g.getId() !== game.id);
    }

}