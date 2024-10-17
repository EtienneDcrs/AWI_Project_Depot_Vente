import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buyer } from '../../models/Buyer';

@Injectable({
    providedIn: 'root'
})
export class BuyerService {

    private apiUrl = 'http://localhost:4000/api/buyers';

    constructor(private http: HttpClient) { }


    getBuyers(): Observable<Buyer[]> {
        return this.http.get<Buyer[]>(this.apiUrl);
    }


    getBuyer(buyerId: string): Observable<Buyer> {
        return this.http.get<Buyer>(`${this.apiUrl}/${buyerId}`);
    }

    addBuyer(buyer: Buyer): Observable<Buyer> {
        return this.http.post<Buyer>(`${this.apiUrl}`, buyer);
    }

}