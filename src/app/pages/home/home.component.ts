import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { GamesSliderComponent } from '../../components/games-slider/games-slider.component';
import { Game } from '../../components/game-card/game-card.component';
import { GamesService, GameResponse } from '../../services/games.service';

@Component({
  selector: 'app-home',
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    GamesSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  games: (Game | GameResponse)[] = [];
  isLoading = false;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.loadFeaturedGames();
  }

  loadFeaturedGames() {
    this.isLoading = true;
    
    this.gamesService.getAllGames({ page: 1, limit: 5 }).subscribe({
      next: (response) => {
        this.games = response.data;
        console.log('Jogos em destaque carregados:', response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar jogos em destaque:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.loadFeaturedGames();
      return;
    }

    this.isLoading = true;
    
    this.gamesService.searchGames(this.searchTerm, 1, 5).subscribe({
      next: (response) => {
        this.games = response.data;
        this.isLoading = false;
        console.log('Buscando por:', this.searchTerm);
      },
      error: (error) => {
        console.error('Erro ao buscar jogos:', error);
        this.isLoading = false;
      }
    });
  }
}
