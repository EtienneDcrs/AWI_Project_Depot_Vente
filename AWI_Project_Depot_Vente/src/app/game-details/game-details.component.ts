import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../../models/Game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent {

    game!: Game;

    constructor(private router:Router, private route: ActivatedRoute, private gameService: GameService) { }

    ngOnInit(): void {
        //Récuperation de l'utilisateur
        this.route.paramMap.subscribe(params => {
            const id = params.get('id')
            console.log(id);
            if (id) {
                // Récupérer l'utilisateur correspondant à l'ID
                this.gameService.getGame(Number(id)).subscribe((data: Game) => {
                    this.game = data;
                    console.log("data",data);
                });
            }
        })
    }

    

    buyGame() {
        // Method to handle buying a game
        const gameId = this.game.id;
        if (confirm('Êtes-vous sûr de vouloir acheter ce jeu ?')) {
            this.gameService.buyGame(gameId).subscribe(() => {
                this.router.navigate(['/games']);
                // Remove the game from the list immediately after successful purchase
                alert('Achat réussi !');
            }, error => {
                console.error('Erreur lors de l\'achat du jeu:', error);
                alert('Échec de l\'achat, veuillez réessayer.');
            });
        }
    }

}