import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.html',
  styleUrls: ['./player-card.css']
})
export class PlayerCard {
  @Input() player!: Player;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Player>();

  onDelete() {
    this.delete.emit(this.player.id);
  }
  onEdit() {
    this.edit.emit(this.player);
  }
  getPlayerImage() {
    return this.player.image || 'assets/images/default-player.png';
  }
  getPlayerStatistics() {
    return this.player.statistics || {
      Overall: 0,
      Pace: 0,
      Shooting: 0,
      Passing: 0,
      Dribbling: 0,
      Defending: 0,
      Physical: 0
    };
  }
  selectPlayer(player: Player) {
    this.edit.emit(player);
  }
  
}

