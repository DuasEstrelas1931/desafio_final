import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  menuVisible = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  goTo(route: string) {
    this.router.navigate(['/' + route]);
    this.menuVisible = false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
