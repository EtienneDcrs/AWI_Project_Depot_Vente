import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Game } from '../../models/Game';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private apiUrl = 'http://localhost:3000/transactions';

    constructor(private http: HttpClient) { }

    addTransaction(transaction: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, transaction);
    }

    getTransactions(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}`);
    }
}