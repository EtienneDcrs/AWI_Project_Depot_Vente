import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
    standalone: true,
    selector: 'app-add-game',
    template: `
    <form [formGroup]="addGameForm" (ngSubmit)="onSubmit()">
      <label for="name">Game Name</label>
      <input id="name" formControlName="name" type="text">
      
      <label for="price">Price</label>
      <input id="price" formControlName="price" type="number">
      
      <label for="sellerId">Seller ID</label>
      <input id="sellerId" formControlName="sellerId" type="number">
      
      <button type="submit" [disabled]="addGameForm.invalid">Add Game</button>
    </form>
  `,
    imports: [ReactiveFormsModule]
})
export class AddGameComponent {
    addGameForm: FormGroup;

    constructor(private fb: FormBuilder, private gameService: GameService) {
        this.addGameForm = this.fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            sellerId: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.addGameForm.valid) {
            const newGame = this.addGameForm.value;
            this.gameService.addGame(newGame).subscribe(response => {
                console.log('Game added:', response);
            });
        }
    }
}
