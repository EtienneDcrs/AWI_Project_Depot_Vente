import { Component, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css'
})
export class GameCardComponent {
    @Input() game!: Game;
    @Input() showSeller: boolean = false;

    constructor(private gameService: GameService) { }

}
