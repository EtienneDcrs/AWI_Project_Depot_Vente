import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/Game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private apiUrl = 'http://localhost:3000/games';
    gamesList: Game[] = [];

    constructor(private http: HttpClient) { }

    // Fetch games from the API and return them as an array of Game objects
    getGames(): Game[] {
        this.http.get(this.apiUrl).subscribe(data => {
            this.gamesList = data as Game[];
        });
        return this.gamesList;
    }

    // Add new game
    addGame(game: Game): Observable<Game> {
        return this.http.post<Game>(this.apiUrl, game);
    }
}