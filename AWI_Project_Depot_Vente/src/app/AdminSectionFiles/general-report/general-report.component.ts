import { Component } from '@angular/core';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../../models/Transaction';

@Component({
  selector: 'app-general-report',
  standalone: true,
  imports: [AdminNavigationComponent],
  templateUrl: './general-report.component.html',
  styleUrl: './general-report.component.css'
})
export class GeneralReportComponent {
    transactions: Transaction[] = [];


    constructor(private transactionService: TransactionService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        console.log('General Report Component');
        this.loadTransactions();

    }

    loadTransactions() {
        this.transactionService.getTransactions().subscribe(
            (data) => {
                this.transactions = data;
                console.log(this.transactions);
            }
        );
    }

}
