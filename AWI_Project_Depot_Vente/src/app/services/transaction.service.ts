import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/Transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private apiUrl = 'http://localhost:4000/api/transactions';

    constructor(private http: HttpClient) { }

    // Méthode pour ajouter une transaction
    addTransaction(transaction: Transaction): Observable<Transaction> {
        console.log('Ajouter une transaction:', transaction);
        return this.http.post<Transaction>(`${this.apiUrl}`, transaction);
    }

    getTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}`);
    }
}