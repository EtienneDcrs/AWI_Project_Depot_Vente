export class Game {
    private static lastId: number = 0;
    id!: number;
    name!: string;
    editor!: string;
    price!: number;
    sellerId!: number;
    sellerName!: string;

    constructor(name: string, editor: string, price: number, sellerId: number, sellerName: string) {

        this.id = Game.generateUniqueId();
        this.name = name;
        this.editor = editor;
        this.price = price;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
    }

    private static generateUniqueId(): number {
        return ++Game.lastId;
    }

    public getId(): number {
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

    public getSellerId(): number {
        return this.sellerId;
    }

    public getSellerName(): string {
        return this.sellerName;
    }
}
