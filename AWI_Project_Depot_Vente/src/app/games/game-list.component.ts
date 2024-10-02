import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/Game';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameService } from '../services/game.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
    standalone: true,
    selector: 'app-game-list',
    imports: [CommonModule, GameCardComponent, SearchBarComponent],
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

    games: Game[] = [];
    filteredGames: Game[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.loadGames();
    }

    // Load the games from the GameService
    loadGames() {
        this.gameService.getGames().subscribe((data: Game[]) => {
            this.games = data;
        }, (error) => {
            console.error('Erreur lors de la récupération des jeux:', error);
        });
    }

    // Method to handle buying a game
    handleBuy(gameId: number) {
        if (confirm('Êtes-vous sûr de vouloir acheter ce jeu ?')) {
            this.gameService.buyGame(gameId).subscribe(() => {
                // Remove the game from the list immediately after successful purchase
                this.games = this.games.filter(game => game.id !== gameId);
                alert('Achat réussi !');
            }, error => {
                console.error('Erreur lors de l\'achat du jeu:', error);
                alert('Échec de l\'achat, veuillez réessayer.');
            });
        }
    }

    // Handle search input from searchBar component
    handleSearch(searchTerm: string) {
        if (!searchTerm || searchTerm.trim() === '' || searchTerm === 'Rechercher un jeu...') {
            this.filteredGames = this.games; // Reset to all games if searchTerm is empty or placeholder
        } else {
            this.filteredGames = this.games.filter(game =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.editor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    }
}
