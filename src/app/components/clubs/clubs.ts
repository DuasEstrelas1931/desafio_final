import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubService, Club } from '../../services/club';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './clubs.html',
  styleUrls: ['./clubs.css']
})
export class Clubs implements OnInit {
  private clubService = inject(ClubService);
  clubs: Club[] = [];

  ngOnInit() {
    this.clubService.getClubs().subscribe(data => this.clubs = data);
  }

}
