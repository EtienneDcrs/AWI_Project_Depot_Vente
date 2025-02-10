import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { GameService } from '../../services/game.service';
import { CurrencyPipe } from '@angular/common';
import { AdminNavigationComponent } from "../admin-navigation/admin-navigation.component";
import { Transaction } from '../../../models/Transaction';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-seller-payments',
  standalone: true,
  imports: [CurrencyPipe, AdminNavigationComponent],
  templateUrl: './seller-payments.component.html',
  styleUrls: ['./seller-payments.component.css']
})
export class SellerPaymentsComponent implements OnInit {
  transactions: Transaction[] = [];
  sellerPayments: { sellerId: string; sellerName: string; totalSales: number; totalCommission: number; totalToGive: number }[] = [];

  constructor(private transactionService: TransactionService, private gameService: GameService) { }

  ngOnInit() {
    this.loadSellerPayments();
  }

  loadSellerPayments() {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
      let paymentsMap: { [key: string]: { sellerName: string; totalSales: number; totalCommission: number } } = {};

      const gameRequests = this.transactions.map(transaction =>
        this.gameService.getGame(transaction.gameId).pipe(
          map(game => {
            if (game) {
              const sellerId = game.sellerId;
              const sellerName = game.sellerName;
              const salePrice = game.price;
              const commission = game.commission;

              if (!paymentsMap[sellerId]) {
                paymentsMap[sellerId] = {
                  sellerName: sellerName,
                  totalSales: 0,
                  totalCommission: 0
                };
              }

              paymentsMap[sellerId].totalSales += salePrice;
              paymentsMap[sellerId].totalCommission += commission;
            }
          })
        )
      );

      forkJoin(gameRequests).subscribe(() => {
        this.sellerPayments = Object.keys(paymentsMap).map(sellerId => ({
          sellerId: sellerId,
          sellerName: paymentsMap[sellerId].sellerName,
          totalSales: paymentsMap[sellerId].totalSales,
          totalCommission: paymentsMap[sellerId].totalCommission,
          totalToGive: paymentsMap[sellerId].totalSales - paymentsMap[sellerId].totalCommission
        }));
      });
    });
  }
}
