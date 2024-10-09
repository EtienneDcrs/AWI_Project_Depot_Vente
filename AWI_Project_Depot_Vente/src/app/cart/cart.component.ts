import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    cart: Game[] = [];

    constructor(private gameService:GameService) { }

    ngOnInit(): void {
        this.loadCart();
    }

    // Load the cart from the GameService
    loadCart() {
        this.cart = this.gameService.getCart();
    }
}
