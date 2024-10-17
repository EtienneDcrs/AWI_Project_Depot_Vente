import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../../models/Seller';

@Injectable({
    providedIn: 'root'
})
export class SellerService {

    private apiUrl = 'http://localhost:4000/api/sellers';

    constructor(private http: HttpClient) { }

    // Fetch sellers from the API and return them as an Observable
    getSellers(): Observable<Seller[]> {
        return this.http.get<Seller[]>(this.apiUrl);
    }

    // Fetch a seller from the API using the sellerId and return it as an Observable
    getSeller(sellerId: string): Observable<Seller> {
        return this.http.get<Seller>(`${this.apiUrl}/${sellerId}`);
    }

    // Add a seller to the database
    addSeller(seller: Seller): Observable<Seller> {
        return this.http.post<Seller>(`${this.apiUrl}`, seller);
    }

}