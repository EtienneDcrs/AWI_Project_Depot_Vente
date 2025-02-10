import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { GameService } from '../../services/game.service';
import { Buyer } from '../../../models/Buyer';
import { BuyerService } from '../../services/buyer.service';
import { StockService } from '../../services/stock.service';
import { catchError, EMPTY, forkJoin, switchMap } from 'rxjs';
import { Game } from '../../../models/Game';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart: Game[] = [];
  filteredBuyers: Buyer[] = [];
  selectedBuyer: Buyer | null = null;

  @Output() gameRemoved = new EventEmitter<Game>();

  constructor(
    private stockService: StockService,
    private router: Router,
    private transactionService: TransactionService,
    private gameService: GameService,
    private buyerService: BuyerService
  ) { }

  ngOnInit(): void {
    this.gameService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  onSearchBuyer(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();

    if (query.length > 2) {
      this.stockService.searchBuyers(query).subscribe(
        (buyers) => this.filteredBuyers = buyers || [],
        (error) => console.error('Error fetching buyers:', error)
      );
    } else {
      this.filteredBuyers = [];
    }
  }

  onBuyerSelect(buyer: Buyer) {
    this.selectedBuyer = buyer;
    this.filteredBuyers = [];
  }

  navigateToAddBuyer() {
    this.router.navigate(['/enregistrement/ajouterClient']);
  }

  onSubmit() {
    if (!this.selectedBuyer) {
      console.error("Aucun acheteur sélectionné");
      return;
    }

    if (this.cart.length === 0) {
      console.error("Le panier est vide");
      return;
    }

    this.processTransactions().then(() => {
      this.router.navigate(['/inventaire']);
    }).catch(error => {
      console.error("Erreur lors du traitement des transactions:", error);
    });
  }

  private processTransactions(): Promise<void> {
    return new Promise((resolve, reject) => {
      const transactionObservables = this.cart.map(game => {
        const transactionData = {
          gameId: game.id,
          gameName: game.name,
          buyerId: this.selectedBuyer!.id,
          buyerName: `${this.selectedBuyer!.firstName} ${this.selectedBuyer!.name}`,
          sellerId: game.sellerId,
          sellerName: game.sellerName,
          date: new Date(),
          price: game.price,
          depositFee: game.depositFee,
          commission: game.commission,
          sessionId: game.sessionId
        };

        return this.transactionService.addTransaction(transactionData).pipe(
          switchMap(response => {
            console.log('Transaction ajoutée:', response);
            return this.gameService.sellGame(game.id);
          }),
          catchError(error => {
            console.error('Erreur lors de la transaction pour le jeu', game.id, error);
            return EMPTY;
          })
        );
      });

      forkJoin(transactionObservables).subscribe(() => {
        console.log('Toutes les transactions ont été effectuées avec succès.');
        this.gameService.clearCart();
        resolve();
      }, reject);
    });
  }
}
