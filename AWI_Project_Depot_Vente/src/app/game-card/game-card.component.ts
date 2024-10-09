import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../../models/Game';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css'
})
export class GameCardComponent {
    @Input() game!: Game;

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

    addToCart() {
        // Method to handle adding a game to the cart
        if (confirm('Êtes-vous sûr de vouloir ajouter ce jeu au panier ?')) {
            this.gameService.addToCart(this.game);
        }
    }


}
