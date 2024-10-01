import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/Game';

@Component({
    standalone: true,
    selector: 'app-game-list',
    imports: [CommonModule],
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

    games: Game[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.loadGames();
    }

    // Récupérer les jeux en souscrivant à l'Observable
    loadGames() {
        this.gameService.getGames().subscribe((data: Game[]) => {
            this.games = data;
        }, (error) => {
            console.error('Erreur lors de la récupération des jeux:', error);
        });
    }

    // Method to handle buying a game
    buyGame(gameId: number) {
        if (confirm('Êtes-vous sûr de vouloir acheter ce jeu ?')) { // Confirmation before purchase
            this.gameService.buyGame(gameId).subscribe(() => {
                // Remove the game from the list after purchase
                this.games = this.games.filter(game => game.id !== gameId);
                alert('Achat réussi !'); // Show success message
            }, (error) => {
                console.error('Erreur lors de l\'achat du jeu:', error);
                alert('Échec de l\'achat, veuillez réessayer.'); // Show error message
            });
        }
    }
}
