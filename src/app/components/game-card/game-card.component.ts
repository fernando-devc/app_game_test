import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameResponse } from '../../services/games.service';

export interface Game {
  id: number;
  title: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-game-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input() game!: Game | GameResponse;
  
  private fallbackImage = 'placeholder.png';

  constructor(private router: Router) {}

  get gameTitle(): string {
    return 'title' in this.game ? this.game.title :'Unknown Game';
  }

  get gameImage(): string {
    const image = 'image' in this.game ? this.game.image : this.game.imageUrl;
    return image || this.fallbackImage;
  }

  get gameRating(): number {
    return this.game.rating;
  }

  get gameId(): string | number {
    return this.game.id;
  }

  onImageError(event: any) {
    event.target.src = this.fallbackImage;
  }

  viewDetails(): void {
    this.router.navigate(['/details', this.gameId]);
  }
}
