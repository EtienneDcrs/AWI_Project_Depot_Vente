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
        this.games = this.gameService.getGames();
    }
}
