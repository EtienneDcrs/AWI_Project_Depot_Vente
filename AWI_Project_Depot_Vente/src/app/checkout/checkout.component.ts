import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';
import { TransactionService } from '../services/transaction.service';
import { PasswordComponent } from '../password/password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PasswordComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  validationCode: string = ''; // Champ pour le code de validation
  validationMessage: string = ''; // Message pour l'utilisateur
  isCheckoutConfirmed: boolean = false; // Vérifier si l'achat est confirmé

  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router, private transactionService: TransactionService) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isCheckoutConfirmed = true; // Afficher le champ de validation
    } else {
      console.log('Invalid form');
    }
  }

  addTransaction(transactionData: any) {
    // Créez une nouvelle transaction avec les données du formulaire et d'autres informations
    const transaction = {
      gameId: transactionData.gameId,
      buyer: {
        name: transactionData.name,
        email: transactionData.email,
        phone: transactionData.phone,
        address: transactionData.address
      },
      price: this.getGamePrice(transactionData.gameId) // Récupérer le prix du jeu
    };

    console.log('Transaction:', transaction);

    this.transactionService.addTransaction(transaction).subscribe(() => {
      this.router.navigate(['/transactions']); // Redirigez vers la page des transactions
    });
  }

  private getGamePrice(gameId: number): number {
    let price = 0;
    this.gameService.getGame(gameId).subscribe(game => {
      price = game.price;
    });
    return price;
  }
}
