import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chatbot } from "./pages/chatbot/chatbot";
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Chatbot, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-chanpions');

   constructor(private router: Router) {}
   
  isLoginOrRegisterPage(): boolean {
    const currentRoute = this.router.url;
    return ['/login', '/register'].some(route => currentRoute.includes(route));
  }

}
