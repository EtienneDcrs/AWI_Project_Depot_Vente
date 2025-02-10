import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterNavigationComponent } from '../register-navigation/register-navigation.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../../models/Game';
import { CartComponent } from '../../Composant/cart/cart.component'; // Importez le composant Cart ici
import { SearchBarComponent } from '../../Composant/search-bar/search-bar.component';
import { GameCardComponent } from '../../gameFolder/game-card/game-card.component';

@Component({
  selector: 'app-enregistrer-achat',
  standalone: true,
  imports: [RegisterNavigationComponent, CartComponent, SearchBarComponent, GameCardComponent], // Ajoutez le composant Cart ici
  templateUrl: './enregistrer-achat.component.html',
  styleUrls: ['./enregistrer-achat.component.css'] // Corrigez le nom du fichier
})
export class EnregistrerAchatComponent implements OnInit {
  filteredGames: Game[] = [];
  showSeller: boolean = true;
  games: Game[] = [];

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    // Charger les jeux disponibles (en rayon)
    this.gameService.getRayonGames().subscribe(games => {
      this.games = games;
      this.filteredGames = games;
    });
  }

  handleSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '' || searchTerm === 'Rechercher un jeu...') {
      this.filteredGames = this.games; // Réinitialiser si le terme de recherche est vide
    } else {
      this.filteredGames = this.games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.editor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.id.toString().includes(searchTerm) ||
        game.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onAddToCart(game: Game) {
    this.gameService.addToCart(game);
    this.filteredGames = this.filteredGames.filter(g => g.id !== game.id); // Retirer le jeu de la liste visible
  }

  gameRemoved(game: Game) {
    this.filteredGames.push(game); // Ajouter le jeu à la liste visible
  }
}
