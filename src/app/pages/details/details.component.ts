import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GamesService, GameResponse } from '../../services/games.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  game: GameResponse | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.loadGameDetails(gameId);
    }
  }

  private loadGameDetails(id: string): void {
    this.loading = true;
    this.gamesService.getGameById(id).subscribe({
      next: (game) => {
        this.game = game;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do jogo:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder.png';
  }
}
