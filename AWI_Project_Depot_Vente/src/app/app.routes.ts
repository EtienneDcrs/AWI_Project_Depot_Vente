import { Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
    { path: 'games', component: GamePageComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
];
