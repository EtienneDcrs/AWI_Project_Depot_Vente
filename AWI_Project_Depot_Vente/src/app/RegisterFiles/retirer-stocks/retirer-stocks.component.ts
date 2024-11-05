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
  selector: 'app-retirer-stocks',
  standalone: true,
  imports: [RegisterNavigationComponent, GameCardComponent, ConfirmDialogComponent, MatDialogModule, SearchBarComponent],
  templateUrl: './retirer-stocks.component.html',
  styleUrls: ['./retirer-stocks.component.css']
})
export class RetirerStocksComponent implements OnInit {
  filteredGames: Game[] = [];
  gamesInStock: Game[] = [];

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGamesInStock();
  }

  loadGamesInStock() {
    this.gameService.getStockGames().subscribe(
      (data: Game[]) => {
        this.gamesInStock = data;
        this.filteredGames = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des jeux en stock:', error);
      }
    );
  }

  retirerDuStock(game: Game) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Etes-vous sûr de vouloir retirer ce jeu du stock ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.gameService.updateGameStatus(game.id, 'retiré').subscribe(
          () => {
            this.gamesInStock = this.gamesInStock.filter(g => g.id !== game.id);
            this.filteredGames = this.filteredGames.filter(g => g.id !== game.id);
          },
          (error) => {
            console.error('Erreur lors du retrait du jeu du stock:', error);
          }
        );
      }
    });
  }

  handleSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '' || searchTerm === 'Rechercher un jeu...') {
      this.filteredGames = this.gamesInStock;
    } else {
      this.filteredGames = this.gamesInStock.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.editor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.id.toString().includes(searchTerm) ||
        game.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
