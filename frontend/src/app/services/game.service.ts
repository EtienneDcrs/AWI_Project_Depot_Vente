import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Game } from '../../models/Game';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private cart = new BehaviorSubject<Game[]>([]);
    cart$ = this.cart.asObservable();

    prixCartTotal = new BehaviorSubject<number>(0);
    prixCartTotal$ = this.prixCartTotal.asObservable();
    private apiUrl = environment.backendHostUrl + '/games';

    constructor(private http: HttpClient) { }

    // Fetch games from the API and return them as an Observable
    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.apiUrl);
    }

    // Fetch games from the API that have the status 'rayon' and return them as an Observable
    getRayonGames(): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/rayon`);
    }

    // Fetch games from API that have the status 'stock' and return them as an Observable
    getStockGames(): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/stock`);
    }

    // Update the status of a game in the API using the gameId and new status
    updateGameStatus(gameId: string, newStatus: string): Observable<Game> {
        return this.http.put<Game>(`${this.apiUrl}/${gameId}`, { status: newStatus });
    }

    sellGame(gameId: string): Observable<Game> {
        console.log('Vendre le jeu avec l\'ID:', gameId);
        return this.http.post<Game>(`${this.apiUrl}/${gameId}/vendu`, {});
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

        this.addGameBackToStock(game);
    }

    addGameBackToStock(game: Game) {
        this.updateGameStatus(game.id, 'rayon').subscribe(response => {
            console.log('Game status updated:', response);
        });
    }

    getCart(): Game[] {
        return this.cart.value;
    }

    clearCart() {
        this.cart.next([]);
        this.prixCartTotal.next(0);
    }
}
