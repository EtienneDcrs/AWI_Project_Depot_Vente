import { Component, OnInit } from '@angular/core';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';
import { GameCardComponent } from '../../gameFolder/game-card/game-card.component';
import { ConfirmDialogComponent } from '../../Composant/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SearchBarComponent } from '../../Composant/search-bar/search-bar.component';

@Component({
  selector: 'app-retirer-rayon',
  standalone: true,
  imports: [RegisterNavigationComponent, GameCardComponent, ConfirmDialogComponent, MatDialogModule, SearchBarComponent],
  templateUrl: './retirer-rayon.component.html',
  styleUrls: ['./retirer-rayon.component.css']
})
export class RetirerRayonComponent implements OnInit {
  filteredGames: Game[] = [];
  gamesInRayon: Game[] = [];

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGamesInRayon();
  }

  loadGamesInRayon() {
    this.gameService.getRayonGames().subscribe(
      (data: Game[]) => {
        this.gamesInRayon = data;
        this.filteredGames = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des jeux en rayon:', error);
      }
    );
  }

  onRemoveFromShelf(game: Game) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Etes-vous sûr de vouloir retirer ce jeu du rayon ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.gameService.updateGameStatus(game.id, 'stock').subscribe(
          () => {
            this.gamesInRayon = this.gamesInRayon.filter(g => g.id !== game.id);
            this.filteredGames = this.filteredGames.filter(g => g.id !== game.id);
          },
          (error) => {
            console.error('Erreur lors du retrait du jeu du rayon:', error);
          }
        );
      }
    });
  }

  handleSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '' || searchTerm === 'Rechercher un jeu...') {
      this.filteredGames = this.gamesInRayon;
    } else {
      this.filteredGames = this.gamesInRayon.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.editor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.id.toString().includes(searchTerm) ||
        game.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
