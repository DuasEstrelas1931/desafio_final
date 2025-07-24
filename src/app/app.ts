import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chatbot } from "./pages/chatbot/chatbot";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Chatbot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-chanpions');
}
