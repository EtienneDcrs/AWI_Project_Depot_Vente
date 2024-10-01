import { Game } from "./Game";
import { User } from "./User";

export class Client extends User{
    adress!: string;
    wishlist: Game[] = [];
    cart: Game[] = [];
    purchases: Game[] = [];

    constructor(name: string, email: string, phone: string, adress: string) {
        super(name, email, phone);
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
        this.wishlist = this.wishlist.filter(g => g !== gameId);
    }

    public addToCart(gameId: Game): void {
        this.cart.push(gameId);
    }

    public removeFromCart(gameId: Game): void {
        this.cart = this.cart.filter(g => g !== gameId);
    }
}