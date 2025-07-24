import { Component, Input, OnInit,  
  AfterViewInit, ElementRef, ViewChild 
} from '@angular/core';
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
  @ViewChild('carousel') carouselRef!: ElementRef;
  currentIndex = 0;
  cardWidth = 220; // Largura do card + margens
  visibleCards = 10; // Quantidade de cards visíveis


  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

  ngAfterViewInit() {
    this.updateCarousel();
  }

  

   next() {
    if (this.players.length <= this.visibleCards) return;
    
    this.currentIndex = Math.min(
      this.currentIndex + 1,
      this.players.length - this.visibleCards
    );
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.updateCarousel();
  }

  public goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  private updateCarousel() {
   const scrollPosition = this.currentIndex * this.cardWidth;
    this.carouselRef.nativeElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  get totalSlides(): number {
    return Math.max(0, this.players.length - this.visibleCards + 1);
  }
}
