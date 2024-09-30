import { Routes } from '@angular/router';
import { GameListComponent } from './games/game-list.component';
import { LoginComponent } from './login/login-form.component';
import { SignupComponent } from './signup/signup-form.component';

export const routes: Routes = [
    { path: 'games', component: GameListComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
];
