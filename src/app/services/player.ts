import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PlayerService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3001/api/players';

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.API_URL);
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.API_URL}/${id}`);
  }

  addPlayer(player: Player): Observable<any> {
    return this.http.post(this.API_URL, player);
  }

  updatePlayer(id: number, stats: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}`, { statistics: stats });
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
