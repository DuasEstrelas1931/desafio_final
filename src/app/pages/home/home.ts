import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  username = localStorage.getItem('username') || 'Convidado';

  menuVisible = false;

  constructor(private router: Router) {}

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
