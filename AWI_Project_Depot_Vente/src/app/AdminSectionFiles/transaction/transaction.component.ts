import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { GameService } from '../../services/game.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminNavigationComponent } from "../admin-navigation/admin-navigation.component";
import { Transaction } from '../../../models/Transaction';
import { Game } from '../../../models/Game';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, AdminNavigationComponent],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionDetails: { transaction: Transaction; game: Game | null }[] = [];

  constructor(private transactionService: TransactionService, public gameService: GameService) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
      // Chargez les détails de chaque transaction en utilisant l'ID du jeu
      this.transactions.forEach(transaction => {
        if (transaction.game) { // Vérifiez que l'ID du jeu est défini
          this.gameService.getGame(transaction.game).subscribe(game => {
            this.transactionDetails.push({
              transaction,
              game: game || null
            });
          });
        }
      });
    });
  }
}
