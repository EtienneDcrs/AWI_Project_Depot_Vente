import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Input() buttonType: string = 'none';
    @Output() addToCart = new EventEmitter<Game>();
    @Output() addToShelf = new EventEmitter<Game>();
    @Output() removeFromShelf = new EventEmitter<Game>();
    @Output() removeFromStock = new EventEmitter<Game>();


    constructor(private gameService: GameService) { }

    public onAddToCart() {
        this.addToCart.emit(this.game);
    }

    public onAddToShelf() {
        this.addToShelf.emit(this.game);
    }

    public onRemoveFromShelf() {
        this.removeFromShelf.emit(this.game);
    }

    public onRemoveFromStock() {
        this.removeFromStock.emit(this.game);
    }
}
