import { Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';

export const routes: Routes = [

    { path: 'games', component: GamePageComponent },
    { path: 'admin', component: AdminSectionComponent },
    {path: 'admin/transactions', component: TransactionComponent},
    {path: 'admin/games', component: GamePageComponent},
    {path: 'admin/sellers', component: GamePageComponent},
  
    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
];
