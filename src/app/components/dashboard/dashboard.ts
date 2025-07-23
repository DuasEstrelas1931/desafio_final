import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player';
import { ClubService } from '../../services/club';
import { PlayerCard } from '../player-card/player-card';
import { PlayerForm } from '../player-form/player-form';
import { Carousel } from '../carousel/carousel';
import { Clubs } from '../clubs/clubs';
import { HttpClientModule } from '@angular/common/http';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,  PlayerForm, Carousel, Clubs,  PlayerCard ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  players: Player[] = [];
  featuredPlayers: Player[] = [];

   constructor(private playerService: PlayerService) {}

   ngOnInit() {
     this.loadPlayers();
   }

   loadPlayers() {
    this.playerService.getPlayers().subscribe({
      next: (players) => {
        this.players = players;
        this.featuredPlayers = players.slice(0, 5); // Mostra os primeiros 5 no carrossel
      },
      error: (err) => {
        console.error('Error loading players:', err);
        // Carrega dados padrão caso a API falhe
        this.loadDefaultPlayers();
      }
    });
  }

    loadDefaultPlayers() {
    this.players = [
      // Mesmos jogadores padrão do carrossel
    ];
    this.featuredPlayers = this.players.slice(0, 5);
  }

  onPlayerAdded(newPlayer: Player) {
    this.players.unshift(newPlayer); // Adiciona no início
    this.featuredPlayers = this.players.slice(0, 5); // Atualiza carrossel
  }

  onDeletePlayer(playerId: number) {
    this.players = this.players.filter(p => p.id !== playerId);
    this.updateFeaturedPlayers();
  }

  onEditPlayer(updatedPlayer: Player) {
    const index = this.players.findIndex(p => p.id === updatedPlayer.id);
    if (index !== -1) {
      this.players[index] = updatedPlayer;
      this.updateFeaturedPlayers();
    }
  }

  private updateFeaturedPlayers() {
    this.featuredPlayers = [...this.players].reverse().slice(0, 3);
  }



}
