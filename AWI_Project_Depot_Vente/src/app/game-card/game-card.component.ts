import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Output() buy = new EventEmitter<number>();

  games: Game[] = [];


  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    // Récuperation de l'utilisateur
    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('userId')
    //   console.log(id);
    //   if (id) {
    // 	// Récupérer l'utilisateur correspondant à l'ID
    // 	this.user = this.userService.getUser(Number(id))!;
    // 	console.log(this.user);
    //   }
    // })
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

}