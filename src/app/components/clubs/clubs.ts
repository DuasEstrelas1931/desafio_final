import { Club } from './../../models/club.model';
import { Component, inject, OnInit, OnDestroy, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubService } from '../../services/club';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clubs.html',
  styleUrls: ['./clubs.css']
})
export class Clubs implements OnInit, OnDestroy {
@Input() Club!: Club

  private clubService = inject(ClubService);
  clubs: Club[] = [];
  duplicatedClubs: Club[] = [];
  offset = 0;
  private intervalSub!: Subscription;
  private itemWidth = 120; // Largura de cada item (ajuste conforme seu CSS)

  ngOnInit() {
    this.clubService.getClubs().subscribe(data => {
      this.clubs = data;
      this.duplicatedClubs = [...data, ...data]; // Duplica para efeito infinito
      this.startCarousel();
    });
  }

  getPlayerImage() {
    return this.Club.logo || 'assets/images/default-player.png';
  }

  startCarousel() {
    this.intervalSub = interval(3000).subscribe(() => {
      this.offset -= this.itemWidth;
      
      // Reset para posição inicial quando chegar ao final
      if (Math.abs(this.offset) >= (this.clubs.length * this.itemWidth)) {
        setTimeout(() => {
          this.offset = 0;
        }, 50);
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }

  
}