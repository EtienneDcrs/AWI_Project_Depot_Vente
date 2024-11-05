import { StockService } from "../app/services/stock.service";

export class Game {
    private static lastId: number = 0;
    id!: string;
    name!: string;
    editor!: string;
    price!: number;
    sellerId!: string;
    sellerName!: string;
    status!: string;

    constructor(name: string, editor: string, price: number, sellerId: string, sellerName: string, status: string) {
        this.name = name;
        this.editor = editor;
        this.price = price;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.status = status;
    }

    public getId(): string {
        return this.id;
    }

    public getPrice(): number {
        return this.price;
    }

    public getName(): string {
        return this.name;
    }

    public getEditor(): string {
        return this.editor;
    }

    public getSellerId(): string {
        return this.sellerId;
    }

    public getSellerName(): string {
        return this.sellerName;
    }
}