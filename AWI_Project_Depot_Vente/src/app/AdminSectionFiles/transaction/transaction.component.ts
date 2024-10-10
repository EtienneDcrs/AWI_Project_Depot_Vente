import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../gameFolder/services/transaction.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminNavigationComponent } from "../admin-navigation/admin-navigation.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, AdminNavigationComponent],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((data: any[]) => {
      this.transactions = data;
    });
  }
}
