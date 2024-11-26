import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:4000/api'; // Ajustez l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupère les vendeurs en fonction du prénom ou du nom
  searchSellers(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/sellers?search=${query}`);
  }

  // Ajoute un jeu en stock
  addGameToStock(gameData: any): Observable<any> {
    console.log('Full gameData:', gameData);
    return this.http.post(`${this.baseUrl}/stocks`, gameData);
  }

  // Service StockService
  getLastGameId(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/games/nextid`);
  }
}
