import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetailsComponent } from './details.component';
import { GamesService } from '../../services/games.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        { 
          provide: GamesService, 
          useValue: { 
            getGameById: () => of(null) 
          } 
        },
        { 
          provide: ActivatedRoute, 
          useValue: { 
            params: of({ id: '1' }) 
          } 
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
