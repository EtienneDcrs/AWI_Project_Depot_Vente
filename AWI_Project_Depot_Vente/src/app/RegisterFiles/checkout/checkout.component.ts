import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { PasswordPromptComponent } from '../../Composant/password-prompt/password-prompt.component';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';
import { Buyer } from '../../../models/Buyer';
import { BuyerService } from '../../services/buyer.service';
import { catchError, EMPTY, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PasswordPromptComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cart: Game[] = [];
  buyer!: Buyer;
  @Output() gameRemoved = new EventEmitter<Game>();

  constructor(private fb: FormBuilder, private router: Router, private transactionService: TransactionService, private gameService: GameService, private buyerService: BuyerService) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
    });

    this.gameService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this.gameService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.processBuyer().then(() => {
        this.processTransactions().then(() => {
          this.router.navigate(['/inventaire']);
        }).catch(error => {
          console.error("Error during transactions:", error);
        });
      }).catch(error => {
        console.error("Error processing buyer:", error);
      });
    } else {
      console.error("Formulaire invalide");
    }
  }

  private processBuyer(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.buyerService.getBuyerByEmail(this.checkoutForm.get('email')?.value).subscribe({
        next: buyer => {
          if (buyer) {
            this.buyer = buyer;
            resolve();
          } else {
            // Si aucun acheteur n'est trouvé, en créer un nouveau
            this.buyer = new Buyer(
              this.checkoutForm.get('firstName')?.value,
              this.checkoutForm.get('name')?.value,
              this.checkoutForm.get('email')?.value,
              this.checkoutForm.get('phone')?.value,
              this.checkoutForm.get('address')?.value
            );
            console.log('Adding new buyer:', this.buyer);
            this.buyerService.addBuyer(this.buyer).subscribe(newBuyer => {
              this.buyer = newBuyer;
              resolve();
            }, reject);
          }
        },
        error: reject
      });
    });
  }

  private processTransactions(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.cart.length === 0) {
        console.error("Cart is empty");
        reject("Cart is empty");
        return;
      }

      const transactionObservables = this.cart.map(game => {
        const fullName = this.buyer.firstName + ' ' + this.buyer.name;
        const transactionData = {
          gameId: game.id,
          gameName: game.name,
          buyerId: this.buyer.id,
          buyerName: fullName,
          sellerId: game.sellerId,
          sellerName: game.sellerName,
          date: new Date(),
          price: game.price,
          depositFee: game.depositFee,
          commission: game.commission,
          sessionId: game.sessionId
        };
        console.log('transactiondata:', transactionData);
        return this.transactionService.addTransaction(transactionData).pipe(
          switchMap(response => {
            console.log('Transaction added:', response);
            return this.gameService.sellGame(game.id);
          }),
          catchError(error => {
            console.error('Error processing transaction for game', game.id, error);
            return EMPTY;
          })
        );
      });

      forkJoin(transactionObservables).subscribe(() => {
        console.log('All transactions processed successfully.');
        this.gameService.clearCart();
        resolve();
      }, reject);
    });
  }
}