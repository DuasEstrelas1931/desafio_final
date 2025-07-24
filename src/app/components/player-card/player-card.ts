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
 @Output() deleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Player>();
  @Input() isSelected = false;
  @Input() isComparison = false;
  @Output() selected = new EventEmitter<Player>();
  @Output() compared = new EventEmitter<Player>();

  showStats = false;

  toggleStats() {
    this.showStats = !this.showStats;
  }

  onSelect() {
    this.selected.emit(this.player);
  }

  onCompare() {
    this.compared.emit(this.player);
  }

  onDelete() {
   if (this.player.id) {
    this.deleted.emit(this.player.id);
    }
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

  getStatsArray() {
  return [
    { name: 'Pace', value: this.player.statistics.Pace },
    { name: 'Shooting', value: this.player.statistics.Shooting },
    { name: 'Passing', value: this.player.statistics.Passing },
    { name: 'Dribbling', value: this.player.statistics.Dribbling },
    { name: 'Defending', value: this.player.statistics.Defending },
    { name: 'Physical', value: this.player.statistics.Physical }
  ];
}

}

