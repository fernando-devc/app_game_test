import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { GamesSliderComponent } from '../../components/games-slider/games-slider.component';
import { Game } from '../../components/game-card/game-card.component';

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
export class HomeComponent {
  searchTerm = '';
  
  games: Game[] = [
    { id: 1, title: 'The Witcher 3', image: 'https://via.placeholder.com/300x200', rating: 9.5 },
    { id: 2, title: 'Cyberpunk 2077', image: 'https://via.placeholder.com/300x200', rating: 8.5 },
    { id: 3, title: 'Red Dead Redemption 2', image: 'https://via.placeholder.com/300x200', rating: 9.0 },
    { id: 4, title: 'GTA V', image: 'https://via.placeholder.com/300x200', rating: 8.8 },
    { id: 5, title: 'Elden Ring', image: 'https://via.placeholder.com/300x200', rating: 9.2 },
    { id: 6, title: 'God of War', image: 'https://via.placeholder.com/300x200', rating: 9.1 },
    { id: 7, title: 'Horizon Zero Dawn', image: 'https://via.placeholder.com/300x200', rating: 8.7 },
    { id: 8, title: 'Spider-Man', image: 'https://via.placeholder.com/300x200', rating: 8.9 }
  ];

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }
}
