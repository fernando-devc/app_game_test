import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search.component';
import { GamesService } from '../../services/games.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockGamesService: jasmine.SpyObj<GamesService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const gamesServiceSpy = jasmine.createSpyObj('GamesService', ['getAllGames', 'searchGames']);
    mockActivatedRoute = {
      queryParams: of({ q: '' }),
      snapshot: { queryParams: {} }
    };

    await TestBed.configureTestingModule({
      imports: [SearchComponent, NoopAnimationsModule],
      providers: [
        { provide: GamesService, useValue: gamesServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    mockGamesService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    mockGamesService.getAllGames.and.returnValue(of({ data: [], pagination: { currentPage: 1, totalPages: 1, total: 0, itemsPerPage: 10 } }));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
