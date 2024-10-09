import { Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    { path: 'games', component: GamePageComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }

];
