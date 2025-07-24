import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-form.html',
  styleUrls: ['./player-form.css'],
})
export class PlayerForm {
  @Output() playerAdded = new EventEmitter<Player>();

  player: Omit<Player, 'id'> = {
    name: '',
    club: '',
    nationality: '',
    position: '',
    image: '',
    statistics: {
      Overall: 0,
      Pace: 0,
      Shooting: 0,
      Passing: 0,
      Dribbling: 0,
      Defending: 0,
      Physical: 0
    }
  };

   addPlayer() {
    if (this.player.name && this.player.club) {
      this.playerAdded.emit(this.player); // Emite sem id
      this.resetForm();
    }
  }

  resetForm() {
    this.player = {
      name: '',
      club: '',
      nationality: '',
      position: '',
      image: '',
      statistics: {
        Overall: 0,
        Pace: 0,
        Shooting: 0,
        Passing: 0,
        Dribbling: 0,
        Defending: 0,
        Physical: 0
      }
    };
  }
}