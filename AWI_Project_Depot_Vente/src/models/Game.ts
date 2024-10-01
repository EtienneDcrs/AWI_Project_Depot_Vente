export class Game {
    private static lastId: number = 0;
    id!: number;
    name!: string;
    editor!: string;
    price!: number;
    year: number | null = null;

    constructor(name: string, editor: string, price: number, year: number | null) { 
        this.id = Game.generateUniqueId();
        this.name = name;
        this.editor = editor;
        this.price = price;
        this.year = year;
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

    // return the year of release of the game if known, null otherwise
    public getYear(): number | null {
        return this.year;
    }
}