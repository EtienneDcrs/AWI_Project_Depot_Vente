import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Game } from '../../models/Game';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private cart = new BehaviorSubject<Game[]>([]);
    cart$ = this.cart.asObservable();
    prixCartTotal = new BehaviorSubject<number>(0);
    prixCartTotal$ = this.prixCartTotal.asObservable();
    private apiUrl = 'http://localhost:4000/api/games';

    constructor(private http: HttpClient) { }

    // Fetch games from the API and return them as an Observable
    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.apiUrl);
    }

    // Fetch a game from the API using the gameId and return it as an Observable
    getGame(gameId: string): Observable<Game> {
        return this.http.get<Game>(`${this.apiUrl}/${gameId}`);
    }

    // Déposer un jeu dans la base de données
    addGame(game: Game): Observable<Game> {
        return this.http.post<Game>(`${this.apiUrl}`, game);
    }

    // Add a game to the cart
    addToCart(game: Game) {
        const currentCart = this.cart.value;
        this.cart.next([...currentCart, game]);
        const newTotal = this.prixCartTotal.value + game.price;
        this.prixCartTotal.next(parseFloat(newTotal.toFixed(2)));
    }

    removeFromCart(game: Game) {
        const currentCart = this.cart.value.filter(item => item.id !== game.id);
        this.cart.next(currentCart);
        const newTotal = this.prixCartTotal.value - game.price;
        this.prixCartTotal.next(parseFloat(newTotal.toFixed(2)));
    }

    clearCart() {
        this.cart.next([]);
        this.prixCartTotal.next(0);
    }

    getCart(): Game[] {
        return this.cart.value;
    }
}
