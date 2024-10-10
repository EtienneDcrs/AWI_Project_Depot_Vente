import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Correction ici
})
export class CartComponent {
    cart!: Game[];
    totalPrice!: number;

    constructor(private gameService: GameService) {
        this.cart = this.gameService.getCart();
        this.totalPrice = this.gameService.getCartPrice();
     }
}
