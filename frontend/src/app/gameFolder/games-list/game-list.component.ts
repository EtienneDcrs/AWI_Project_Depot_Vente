import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../models/Game';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
    standalone: true,
    selector: 'app-game-list',
    imports: [CommonModule, GameCardComponent],
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
    @Input() gameList!: Game[];

    constructor() { }



}  
