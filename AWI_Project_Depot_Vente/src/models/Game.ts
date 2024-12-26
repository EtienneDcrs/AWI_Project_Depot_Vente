import { SessionService } from '../app/services/session.service';

export class Game {
    id!: string;
    name!: string;
    editor!: string;
    price!: number;
    sellerId!: string;
    sellerName!: string;
    status!: string;
    depositFee!: number;
    commission!: number;
    sessionId!: string;

    constructor(
        name: string,
        editor: string,
        price: number,
        sellerId: string,
        sellerName: string,
        status: string,
        sessionId: string,
        depositFee: number,
        commission: number
    ) {


        // Initialiser les propriétés restantes
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