import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../../models/Game';
import { GameService } from '../../services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    @Output() gameRemoved = new EventEmitter<Game>();
    cart: Game[] = [];
    prixCartTotal: number = 0;

    constructor(private gameService: GameService, private router: Router, private dialog: MatDialog, private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.subscribeToCart();
        this.gameService.prixCartTotal$.subscribe(total => {
            this.prixCartTotal = total;
        });
    }

    subscribeToCart() {
        this.gameService.cart$.subscribe(cart => {
            this.cart = cart;
        });
    }

    removeFromCart(game: Game) {
        this.gameService.removeFromCart(game);
        this.gameRemoved.emit(game);
        this.gameService.addGameBackToStock(game); // Appeler la méthode pour le remettre en stock
    }


    // Méthode pour finaliser l'achat
    finalizePurchase() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { message: 'Voulez-vous faire une facture ?' } // Passer le message
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // L'utilisateur a confirmé, redirigez vers la page de checkout
                this.router.navigate(['/enregistrement/checkout']);
            } else {
                // Finalisez l'achat sans redirection (si nécessaire)
                this.finalizeTransaction();
            }
        });
    }

    // Exemple de méthode pour finaliser la transaction
    finalizeTransaction() {
        for (let game of this.cart) {

            // Créez l'objet de transaction en n'incluant que les propriétés disponibles
            const transactionData: Transaction = { game: game.id, sellerId: game.sellerId, sellerName: game.sellerName, date: new Date() };

            this.transactionService.addTransaction(transactionData)
                .subscribe(response => {
                    console.log('Transaction added:', response);

                    // Mettre à jour le statut du jeu en "vendu"
                    this.gameService.updateGameStatus(game.id, 'vendu')
                        .subscribe(updateResponse => {
                            console.log('Game status updated:', updateResponse);
                        }, error => {
                            console.error('Error updating game status:', error);
                        });
                }, error => {
                    console.error('Error adding transaction:', error);
                });
        }
        this.gameService.clearCart();
    }

    clearCart() {
        // Methode pour remettre les jeux dans le stock
        for (let game of this.cart) {
            this.removeFromCart(game);
        }
    }
}