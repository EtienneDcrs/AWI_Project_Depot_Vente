import { Component, OnInit } from '@angular/core';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';
import { GameListComponent } from '../../gameFolder/games/game-list.component';
import { GameCardComponent } from '../../gameFolder/game-card/game-card.component';
import { ConfirmDialogComponent } from '../../Composant/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-mettre-rayon',
  standalone: true,
  imports: [RegisterNavigationComponent, GameListComponent, GameCardComponent, ConfirmDialogComponent, MatDialogModule],
  templateUrl: './mettre-rayon.component.html',
  styleUrl: './mettre-rayon.component.css'
})
export class MettreRayonComponent implements OnInit {
  gamesInStock: Game[] = [];

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGamesInStock();
  }

  loadGamesInStock() {
    this.gameService.getStockGames().subscribe(
      (data: Game[]) => {
        this.gamesInStock = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des jeux en stock:', error);
      }
    );
  }

  mettreEnRayon(game: Game) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Procéder avec la mise en rayon
        this.gameService.updateGameStatus(game.id, 'rayon').subscribe(
          () => {
            this.gamesInStock = this.gamesInStock.filter(g => g.id !== game.id);
          },
          (error) => {
            console.error('Erreur lors de la mise en rayon du jeu:', error);
          }
        );
      }
    });
  }

}
