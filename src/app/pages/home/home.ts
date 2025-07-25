import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  username = 'Convidado';
  menuVisible = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const currentUserString = localStorage.getItem('current_champion');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.username = currentUser.username || 'Convidado';
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}

