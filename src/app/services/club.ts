import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Club {
  id: number;
  name: string;
  logo: string;
}

@Injectable({ providedIn: 'root' })

export class ClubService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3001/api/clubs';

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.API_URL);
  }
}
