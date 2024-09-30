import { Routes } from '@angular/router';
import { GameListComponent } from './games/game-list.component';
import { AddGameComponent } from './games/add-game.component';

export const routes: Routes = [
    { path: 'games', component: GameListComponent },
    { path: 'add-game', component: AddGameComponent },
    { path: '', redirectTo: '/games', pathMatch: 'full' }
];
