import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private apiUrl = 'http://localhost:3000/games';

    constructor(private http: HttpClient) { }

    // Fetch games
    getGames(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    // Add new game
    addGame(game: { name: string, price: number, sellerId: number }): Observable<any> {
        return this.http.post(this.apiUrl, game);
    }
}
