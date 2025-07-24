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
  imports: [CommonModule, PlayerForm, Carousel, Clubs, PlayerCard],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  players: Player[] = [];
  featuredPlayers: Player[] = [];
  selectedPlayers: Player[] = [];
  comparedPlayers: Player[] = [];

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
      },
    });
  }

  loadDefaultPlayers() {
    this.players = [
      // Mesmos jogadores padrão do carrossel
    ];
    this.featuredPlayers = this.players.slice(0, 5);
  }

  onPlayerAdded(newPlayer: Player) {
    this.playerService.addPlayer(newPlayer).subscribe({
      next: (playerWithId) => {
        // O backend retornará o jogador COM id gerado
        this.players.unshift(playerWithId); // Adiciona à lista
      },
      error: (err) => console.error('Erro ao adicionar jogador:', err),
    });
  }

  onDeletePlayer(playerId: number) {
  if (confirm('Tem certeza que deseja excluir este jogador?')) {
    this.playerService.deletePlayer(playerId).subscribe({
      next: () => {
        this.players = this.players.filter(p => p.id !== playerId);
        this.selectedPlayers = this.selectedPlayers.filter(p => p.id !== playerId);
        this.comparedPlayers = this.comparedPlayers.filter(p => p.id !== playerId);
      },
      error: (err) => console.error('Erro ao excluir jogador:', err)
    });
  }
}

  onEditPlayer(updatedPlayer: Player) {
    const index = this.players.findIndex((p) => p.id === updatedPlayer.id);
    if (index !== -1) {
      this.players[index] = updatedPlayer;
      this.updateFeaturedPlayers();
    }
  }

  private updateFeaturedPlayers() {
    this.featuredPlayers = [...this.players].reverse().slice(0, 3);
  }

  isPlayerSelected(playerId: number | undefined): boolean {
    return playerId
      ? this.selectedPlayers.some((p) => p.id === playerId)
      : false;
  }

  isPlayerCompared(playerId: number | undefined): boolean {
    return playerId
      ? this.comparedPlayers.some((p) => p.id === playerId)
      : false;
  }
  clearComparison() {
    this.comparedPlayers = []; // Limpa a lista de jogadores comparados
  }

  onSelectPlayer(player: Player) {
    const index = this.selectedPlayers.findIndex((p) => p.id === player.id);

    if (index >= 0) {
      this.selectedPlayers.splice(index, 1); // Deseleciona se já estiver selecionado
    } else {
      if (this.selectedPlayers.length < 2) {
        this.selectedPlayers.push(player);
      } else {
        // Limita a 2 jogadores selecionados (substitui o mais antigo)
        this.selectedPlayers.shift();
        this.selectedPlayers.push(player);
      }
    }
  }

  onComparePlayer(player: Player) {
    const index = this.comparedPlayers.findIndex((p) => p.id === player.id);

    if (index >= 0) {
      this.comparedPlayers.splice(index, 1); // Remove da comparação se já estiver
    } else {
      if (this.comparedPlayers.length < 2) {
        this.comparedPlayers.push(player);
      } else {
        // Limita a 2 jogadores para comparação (substitui o mais antigo)
        this.comparedPlayers.shift();
        this.comparedPlayers.push(player);
      }
    }
  }
}
