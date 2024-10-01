import { Game } from "./Game";
import { User } from "./User";

export class Client extends User {
    // this class is a subclass of User

    adress!: string;
    wishlist: Game[] = [];
    cart: Game[] = [];
    purchases: Game[] = [];

    constructor(name: string, email: string, phone: string, adress: string) {
        super(name, email, phone); // call the constructor of the superclass
        this.adress = adress;
    }

    public getWishlist(): Game[] {
        return this.wishlist;
    }

    public getCart(): Game[] {
        return this.cart;
    }

    public addToWishlist(gameId: Game): void {
        this.wishlist.push(gameId);
    }

    public removeFromWishlist(gameId: Game): void {
        // remove the game by filtering it out
        this.wishlist = this.wishlist.filter(g => g !== gameId);
    }

    public addToCart(gameId: Game): void {
        this.cart.push(gameId);
    }

    public removeFromCart(gameId: Game): void {
        // remove the game by filtering it out
        this.cart = this.cart.filter(g => g !== gameId);
    }
}