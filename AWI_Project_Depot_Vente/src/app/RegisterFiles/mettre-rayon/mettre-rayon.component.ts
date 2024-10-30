import { Component, OnInit } from '@angular/core';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';
import { GameCardComponent } from '../../gameFolder/game-card/game-card.component';
import { ConfirmDialogComponent } from '../../Composant/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SearchBarComponent } from '../../gameFolder/search-bar/search-bar.component';


@Component({
  selector: 'app-mettre-rayon',
  standalone: true,
  imports: [RegisterNavigationComponent, GameCardComponent, ConfirmDialogComponent, MatDialogModule, SearchBarComponent],
  templateUrl: './mettre-rayon.component.html',
  styleUrl: './mettre-rayon.component.css'
})
export class MettreRayonComponent implements OnInit {
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

  mettreEnRayon(game: Game) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Procéder avec la mise en rayon
        this.gameService.updateGameStatus(game.id, 'rayon').subscribe(
          () => {
            this.gamesInStock = this.gamesInStock.filter(g => g.id !== game.id);
            this.filteredGames = this.filteredGames.filter(g => g.id !== game.id); // Assurez-vous de filtrer filteredGames également
          },
          (error) => {
            console.error('Erreur lors de la mise en rayon du jeu:', error);
          }
        );
      }
    });
  }

  handleSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '' || searchTerm === 'Rechercher un jeu...') {
      this.filteredGames = this.gamesInStock; // Réinitialiser si le terme de recherche est vide
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