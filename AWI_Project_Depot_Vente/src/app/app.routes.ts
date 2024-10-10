import { Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TransactionComponent } from './transaction/transaction.component';

export const routes: Routes = [
    { path: 'games', component: GamePageComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'transaction', component: TransactionComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
];
