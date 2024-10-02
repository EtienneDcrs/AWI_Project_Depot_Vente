import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private route: ActivatedRoute) { }

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
  }

}
