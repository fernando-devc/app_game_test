import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { GamesService } from '../../services/games.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockGamesService: jasmine.SpyObj<GamesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockGamesResponse = {
    data: [
      { id: '1', title: 'Game 1', description: 'Description 1', imageUrl: 'image1.jpg', rating: 4.5, releaseDate: '2021-01-01', genres: ['Action'], platforms: ['PC'], developer: 'Developer 1', publisher: 'Publisher 1' },
      { id: '2', title: 'Game 2', description: 'Description 2', imageUrl: 'image2.jpg', rating: 4.7, releaseDate: '2021-02-01', genres: ['Adventure'], platforms: ['PS5'], developer: 'Developer 2', publisher: 'Publisher 2' }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 2,
      itemsPerPage: 5
    }
  };

  beforeEach(async () => {
    const gamesServiceSpy = jasmine.createSpyObj('GamesService', ['getAllGames']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        { provide: GamesService, useValue: gamesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockGamesService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    mockGamesService.getAllGames.and.returnValue(of(mockGamesResponse));
    expect(component).toBeTruthy();
  });

  it('should load featured games on init', () => {
    mockGamesService.getAllGames.and.returnValue(of(mockGamesResponse));
    
    component.ngOnInit();
    
    expect(mockGamesService.getAllGames).toHaveBeenCalledWith({ page: 1, limit: 5 });
    expect(component.games).toEqual(mockGamesResponse.data);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading featured games', () => {
    const error = new Error('API Error');
    mockGamesService.getAllGames.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    
    component.ngOnInit();
    
    expect(console.error).toHaveBeenCalledWith('Error loading featured games:', error);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to search with query params when searching', () => {
    component.searchTerm = 'test game';
    
    component.onSearch();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], { 
      queryParams: { q: 'test game' } 
    });
  });

  it('should not navigate when search term is empty', () => {
    component.searchTerm = '';
    
    component.onSearch();
    
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate when search term is only whitespace', () => {
    component.searchTerm = '   ';
    
    component.onSearch();
    
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to search page when going to all games', () => {
    component.goToAllGames();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search']);
  });

  it('should set loading state correctly during games loading', () => {
    mockGamesService.getAllGames.and.returnValue(of(mockGamesResponse));
    expect(component.isLoading).toBeFalse();
    
    component.loadFeaturedGames();
    
    expect(component.isLoading).toBeFalse();
  });
});
