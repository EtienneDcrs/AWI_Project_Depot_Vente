import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameListComponent } from '../games/game-list.component';
import { FilterComponent } from '../filter/filter.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';

@Component({
    selector: 'app-game-page',
    standalone: true,
    imports: [GameListComponent, FilterComponent, SearchBarComponent],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.css'
})
export class GamePageComponent {
    @Output() games: Game[] = [];
    @Output() filteredGames: Game[] = [];


    constructor(private gameService: GameService) {

    }

    ngOnInit(): void {
        this.loadGames();
    }

    // Load the games from the GameService
    loadGames() {
        this.gameService.getRayonGames().subscribe((data: Game[]) => {
            this.games = data;
            this.filteredGames = data;
        }, (error) => {
            console.error('Erreur lors de la récupération des jeux:', error);
        });
    }

    // Handle applying filters
    applyFilters(filters: { price?: number; }) {
        this.filteredGames = this.games.filter(game => {
            const matchesPrice = filters.price ? game.price <= filters.price : true;
            return matchesPrice;
        });
    }

    // Handle search input from searchBar component
    handleSearch(searchTerm: string) {
        if (!searchTerm || searchTerm.trim() === '' || searchTerm === 'Rechercher un jeu...') {
            this.filteredGames = this.games; // Reset to all games if searchTerm is empty or placeholder
        } else {
            this.filteredGames = this.games.filter(game =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.editor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.id.toString().includes(searchTerm)
            );
        }
    }
}
