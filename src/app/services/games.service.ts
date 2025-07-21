import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameResponse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  releaseDate: string;
  genres: string[];
  platforms: string[];
  developer: string;
  publisher: string;
}

export interface GamesListResponse {
  data: GameResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface SearchParams {
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllGames(params?: SearchParams): Observable<GamesListResponse> {
    let httpParams = new HttpParams();
    
    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get<GamesListResponse>(`${this.baseUrl}/games`, { params: httpParams });
  }

  getGameById(id: string): Observable<GameResponse> {
    return this.http.get<GameResponse>(`${this.baseUrl}/games/${id}`);
  }

  searchGames(searchTerm: string, page: number = 1, limit: number = 10): Observable<GamesListResponse> {
    return this.getAllGames({ search: searchTerm, page, limit });
  }
}
