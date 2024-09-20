import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TouristSpot {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TouristSpotService {
  private apiUrl = 'http://localhost:3000/touristSpots';

  constructor(private http: HttpClient) { }

  getTouristSpots(): Observable<TouristSpot[]> {
    return this.http.get<TouristSpot[]>(this.apiUrl);
  }

  getTouristSpot(id: number): Observable<TouristSpot> {
    return this.http.get<TouristSpot>(`${this.apiUrl}/${id}`);
  }

  createTouristSpot(touristSpot: TouristSpot): Observable<TouristSpot> {
    return this.http.post<TouristSpot>(this.apiUrl, touristSpot);
  }

  updateTouristSpot(id: number, touristSpot: TouristSpot): Observable<TouristSpot> {
    return this.http.put<TouristSpot>(`${this.apiUrl}/${id}`, touristSpot);
  }


  deleteTouristSpot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}