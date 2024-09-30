import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-game-list',
    imports: [CommonModule],
    templateUrl: './game-list.component.html',  // Use external template
})
export class GameListComponent implements OnInit {

    games: any[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.gameService.getGames().subscribe(data => {
            this.games = data;
        });
    }
}
