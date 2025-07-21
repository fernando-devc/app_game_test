import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GamesService, GameResponse, GamesListResponse } from '../../services/games.service';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    GameCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  games: GameResponse[] = [];
  isLoading = false;
  totalItems = 0;
  currentPage = 0;
  pageSize = 12;
  hasSearched = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchTerm = params['q'];
        this.performSearch();
      } else {
        this.loadAllGames();
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.clearSearch();
      return;
    }

    this.currentPage = 0;
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchTerm }
    });
  }

  performSearch() {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.hasSearched = true;

    this.gamesService.searchGames(this.searchTerm, this.currentPage + 1, this.pageSize).subscribe({
      next: (response: GamesListResponse) => {
        this.games = response.data;
        this.totalItems = response.pagination.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar jogos:', error);
        this.isLoading = false;
      }
    });
  }

  loadAllGames() {
    this.isLoading = true;
    this.hasSearched = true;

    this.gamesService.getAllGames({ page: this.currentPage + 1, limit: this.pageSize }).subscribe({
      next: (response: GamesListResponse) => {
        this.games = response.data;
        this.totalItems = response.pagination.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading games:', error);
        this.isLoading = false;
      }
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 0;
    this.router.navigate(['/search']);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.searchTerm.trim()) {
      this.performSearch();
    } else {
      this.loadAllGames();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  trackByGameId(index: number, game: GameResponse): string {
    return game.id;
  }
}
