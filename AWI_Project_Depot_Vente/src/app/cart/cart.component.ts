import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GameService } from '../services/game.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    cart: Game[] = [];
    prixCartTotal: number = 0;

    constructor(private gameService: GameService, private router: Router) { }

    ngOnInit(): void {
        this.subscribeToCart();
        this.gameService.prixCartTotal$.subscribe(total => {
            this.prixCartTotal = total;
        });
    }

    // Abonnez-vous aux changements du panier
    subscribeToCart() {
        this.gameService.cart$.subscribe(cart => {
            this.cart = cart;
        });
    }

    removeFromCart(game: Game) {
        this.gameService.removeFromCart(game);
    }

    // Redirige vers la page de paiement
    finalizePurchase() {
        this.router.navigate(['/checkout']);
    }

    // Vider le panier
    clearCart() {
        this.gameService.clearCart();
    }
}
