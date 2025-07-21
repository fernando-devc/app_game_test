import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  @Input() game!: Game;
}
