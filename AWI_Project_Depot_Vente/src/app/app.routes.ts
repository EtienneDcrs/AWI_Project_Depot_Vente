import { Routes } from '@angular/router';
import { GameListComponent } from './games/game-list.component';
import { LoginComponent } from './login/login-form.component';
import { SignupComponent } from './signup/signup-form.component';
import { GameDetailsComponent } from './game-details/game-details.component';

export const routes: Routes = [
    { path: 'games', component: GameListComponent },
    { path: 'games/:id', component: GameDetailsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
