export class Game {
    private static lastId: number = 0;
    id!: number;
    name!: string;
    editor!: string;
    description!: string;
    price!: number;
    year: number | null = null;
    minAge!: number;
    players!: number;
    image: string;
    sellerId!: number;
    sellerName!: string;

    constructor(name: string, editor: string, price: number, year: number | null, image: string, minAge: number, players: number,sellerId: number, sellerName: string) {

        this.id = Game.generateUniqueId();
        this.name = name;
        this.editor = editor;
        this.price = price;
        this.year = year;
        this.image = image;
        this.minAge = minAge;
        this.players = players;
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

    // Return the year of release of the game if known, null otherwise
    public getYear(): number | null {
        return this.year;
    }

    public getSellerId(): number {
        return this.sellerId;
    }

    public getSellerName(): string {
        return this.sellerName;
    }
}
