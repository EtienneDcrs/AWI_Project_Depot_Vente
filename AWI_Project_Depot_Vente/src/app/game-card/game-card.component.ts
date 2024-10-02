import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../../models/Game';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css'
})
export class GameCardComponent {
    @Output() buy = new EventEmitter<number>();
    @Input() game!: Game;

    games: Game[] = [];


    constructor(private router: Router,private route: ActivatedRoute, private gameService: GameService, private clientService: ClientService) { }

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
    buyGame() {
        this.buy.emit(this.game.id);
    }

    addToCart() {
        // Method to handle adding a game to the cart
        if (confirm('Êtes-vous sûr de vouloir ajouter ce jeu au panier ?')) {
            this.clientService.addToCart(this.game);
        }
    }

    // Method to navigate to the game details page
    goToGameDetails() {
        const gameId = this.game.id;
        this.router.navigate(['/games', gameId]);
    }

}
