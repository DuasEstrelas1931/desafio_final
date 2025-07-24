import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ CommonModule  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  menuVisible: boolean = false;
  isHomePage: boolean = false;

  constructor(private router: Router) {
        this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/' || event.url === '/home';
      }
    });
  }
  


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
