import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../../models/Game';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css'
})
export class GameCardComponent {
    @Input() game!: Game;
    isInCart: boolean = false;

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.checkIfInCart();
        this.subscribeToCartChanges();
    }

    addToCart() {
        // Method to handle adding a game to the cart
        this.gameService.addToCart(this.game);
        this.isInCart = true;
    }

    checkIfInCart() {
        this.isInCart = this.gameService.getCart().some(cartGame => cartGame.id === this.game.id);
    }

    subscribeToCartChanges() {
        this.gameService.cart$.subscribe(cart => {
            this.isInCart = cart.some(cartGame => cartGame.id === this.game.id);
        });
    }
}
