import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { GameCardComponent, Game } from '../game-card/game-card.component';
import { GameResponse } from '../../services/games.service';

declare var $: any;

@Component({
  selector: 'app-games-slider',
  imports: [MatButtonModule, MatIconModule, CommonModule, GameCardComponent],
  templateUrl: './games-slider.component.html',
  styleUrl: './games-slider.component.scss'
})
export class GamesSliderComponent implements AfterViewInit, OnDestroy {
  @Input() games: (Game | GameResponse)[] = [];
  @Input() title = 'Jogos em Destaque';
  @ViewChild('slickCarousel', { static: false }) slickCarousel!: ElementRef;

  slickConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeSlick();
    }, 100);
  }

  private initializeSlick() {
    if (typeof $ !== 'undefined' && this.slickCarousel && this.games.length > 0) {
      const carousel = $(this.slickCarousel.nativeElement);
      if (carousel.hasClass('slick-initialized')) {
        carousel.slick('unslick');
      }
      carousel.slick(this.slickConfig);
      setTimeout(() => {
        carousel.slick('refresh');
      }, 50);
    }
  }

  ngOnDestroy() {
    if (typeof $ !== 'undefined' && this.slickCarousel) {
      const carousel = $(this.slickCarousel.nativeElement);
      if (carousel.hasClass('slick-initialized')) {
        carousel.slick('unslick');
      }
    }
  }

  previousSlide() {
    if (typeof $ !== 'undefined' && this.slickCarousel) {
      $(this.slickCarousel.nativeElement).slick('slickPrev');
    }
  }

  nextSlide() {
    if (typeof $ !== 'undefined' && this.slickCarousel) {
      $(this.slickCarousel.nativeElement).slick('slickNext');
    }
  }

  onSeeMore() {
    console.log('Ver mais jogos');
  }

  trackByGameId(index: number, game: Game | GameResponse): any {
    return game.id || index;
  }
}
