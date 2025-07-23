import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/player.model';
import { PlayerCard } from '../player-card/player-card';
import { PlayerService } from '../../services/player';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, PlayerCard],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnInit {
  @Input() players: Player[] = [];
  currentIndex = 0;
  visibleCards = 5; // Quantidade de cards visíveis


  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

  

  next() {
    if (this.players.length > this.visibleCards) {
      this.currentIndex = (this.currentIndex + 1) % (this.players.length - this.visibleCards + 1);
      this.scrollToCurrent();
    }
  }

  prev() {
    if (this.players.length > this.visibleCards) {
      this.currentIndex = (this.currentIndex - 1 + (this.players.length - this.visibleCards + 1)) % 
                         (this.players.length - this.visibleCards + 1);
      this.scrollToCurrent();
    }
  }

  public goToSlide(index: number) {
    this.currentIndex = index;
    this.scrollToCurrent();
  }

  private scrollToCurrent() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    if (carousel) {
      const cardWidth = 220; // Largura fixa do card + gap
      carousel.scrollTo({
        left: this.currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }
}
