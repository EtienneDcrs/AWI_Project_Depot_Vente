import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/Game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    cart: Game[] = [];
    private apiUrl = 'http://localhost:3000/games';

    constructor(private http: HttpClient) { }

    // Fetch games from the API and return them as an Observable
    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.apiUrl);
    }

    // Fetch a game from the API using the gameId and return it as an Observable
    getGame(gameId: number): Observable<Game> {
        return this.http.get<Game>(`${this.apiUrl}/${gameId}`);
    }

    // Add a game to the cart
    addToCart(game: Game) {
        // Add the game to the cart
        this.cart.push(game);
    }

    getCart(): Game[] {
        return this.cart;
    }
    
}
