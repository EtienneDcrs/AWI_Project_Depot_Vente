import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

    getBuyerByEmail(email: string): Observable<Buyer | null> {
        return this.http.get<Buyer | {}>(`${this.apiUrl}/email/${email}`).pipe(
            map((data: any) => {
                // Si l'objet est vide, retournez null pour indiquer l'absence d'acheteur
                if (Object.keys(data).length === 0) {
                    return null;
                }
                // Sinon, créez une instance de Buyer
                return new Buyer(data.firstName, data.name, data.email, data.phone, data.address);
            })
        );
    }

    addBuyer(buyer: Buyer): Observable<Buyer> {
        return this.http.post<Buyer>(`${this.apiUrl}`, buyer);
    }

}