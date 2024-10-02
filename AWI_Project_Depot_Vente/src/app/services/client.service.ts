import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../../models/Client';
import { Game } from '../../models/Game';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    client!:Client;

    constructor() { }

    addToCart(game:Game) {
        // Method to handle adding a game to the cart
        this.client.cart.push(game);
        alert('Le jeu a été ajouté au panier');
        console.log(this.client.cart);
    }
}
