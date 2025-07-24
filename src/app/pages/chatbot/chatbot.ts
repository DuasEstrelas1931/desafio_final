import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chatbot',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot {
   isOpen = false;
  userInput = '';
  messages: {text: string, isBot: boolean, time: Date}[] = [
    {
      text: 'Olá! Sou o assistente virtual do Timaço da Champions. Como posso ajudar?',
      isBot: true,
      time: new Date()
    }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {   
  if (this.userInput.trim()) {
    const userMessage = this.userInput; // Guarda o valor antes de limpar  
    this.messages.push({
      text: userMessage,
      isBot: false,
      time: new Date()
    });

    // Chama apenas UMA vez e armazena o resultado
    const botResponse = this.getBotResponse(userMessage);
    
    setTimeout(() => {
      this.messages.push({
        text: botResponse, // Usa a resposta já gerada
        isBot: true,
        time: new Date()
      });
    }, 1000);

    this.userInput = ''; // Limpa só depois de usar
  }
}
  
  private getBotResponse(input: string): string {
    const normalizedInput = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");    
    

  // Verificação com retorno garantido
  if (/(jogador|craque|atleta)/.test(normalizedInput)) {
    return 'Você pode adicionar novos jogadores na página principal do dashboard!';
  } 
  
  if (/(clube|time|equipe)/.test(normalizedInput)) {
    return 'Os clubes participantes são listados na seção de clubes.';
  }
  
  if (/(contato|ajuda|suporte|falar)/.test(normalizedInput)) {
    return 'Visite nossa página de contato para falar com nosso time!';
  }

  // Retorno padrão (garante que sempre retorna string)
  const randomResponses = [
    'Como posso te ajudar com o Timaço da Champions?',
    'Desculpe, não entendi. Pode reformular?',
    'Estou aqui para ajudar com informações sobre jogadores e clubes!'
  ];
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}
}
