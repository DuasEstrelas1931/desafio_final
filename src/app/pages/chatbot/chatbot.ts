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
    

  // Respostas sobre a página "Sobre"
    if (/(sobre|hist[óo]ria|competi[çc][aã]o|ucl)/.test(normalizedInput)) {
      return this.getAboutPageResponse(normalizedInput);
    }

    // Respostas sobre jogadores
    if (/(jogador|atleta|craque|gol|artilh[ea]ri[ao])/.test(normalizedInput)) {
      return this.getPlayersResponse(normalizedInput);
    }

    // Respostas sobre clubes
    if (/(clube|time|equipe|participante)/.test(normalizedInput)) {
      return this.getClubsResponse(normalizedInput);
    }

    // Respostas sobre o site
    if (/(site|funcionalidade|dashboard|contato)/.test(normalizedInput)) {
      return this.getWebsiteResponse(normalizedInput);
    }

    // Respostas sobre estatísticas
    if (/(estat[íi]stica|n[úu]mero|dado|curiosidade)/.test(normalizedInput)) {
      return this.getStatsResponse();
    }

    // Resposta padrão com sugestões
    return this.getDefaultResponse();
  }

  private getAboutPageResponse(input: string): string {
    if (/(final|alli?anz|est[áa]dio|munique)/.test(input)) {
      return 'A final de 2025 será na Allianz Arena em Munique, com capacidade para 75 mil torcedores. O estádio é do Bayern de Munique desde 2006.';
    }

    if (/(formato|como funciona|temporada)/.test(input)) {
      return 'Na temporada 2024-25, a Champions terá 36 clubes na fase de liga (antes eram 32). Cada time jogará 8 partidas nesta fase.';
    }

    if (/(trofeu|premio|ta[çc]a)/.test(input)) {
      return 'O troféu da Champions tem 74cm de altura e pesa 7.5kg. Clubes que vencerem 5 vezes ou 3 consecutivas ganham uma réplica.';
    }

    return 'A Champions League é a principal competição de clubes da Europa, criada em 1955. O Real Madrid é o maior campeão com 15 títulos.';
  }

  private getPlayersResponse(input: string): string {
    if (/(cristiano|ronaldo|cr7)/.test(input)) {
      return 'Cristiano Ronaldo é o maior artilheiro da história com 141 gols. Ele marcou por Manchester United, Real Madrid e Juventus.';
    }

    if (/(messi|le[ao]|lionel)/.test(input)) {
      return 'Lionel Messi é o segundo maior artilheiro com 129 gols, todos pelo Barcelona (menos alguns pelo PSG).';
    }

    if (/(adicionar|cadastrar|novo)/.test(input)) {
      return 'Você pode adicionar novos jogadores no menu "Jogadores" do dashboard. Precisa ter permissão de administrador!';
    }

    return 'Os maiores artilheiros são: 1º Cristiano Ronaldo (141), 2º Messi (129), 3º Lewandowski (94). Para ver mais, acesse a seção de Jogadores.';
  }

  private getClubsResponse(input: string): string {
    if (/(real madrid|merengue|madrid)/.test(input)) {
      return 'O Real Madrid é o maior campeão com 15 títulos (último em 2024). Jogadores históricos: Di Stéfano, Raúl, Cristiano Ronaldo.';
    }

    if (/(bayern|munique|bávaro)/.test(input)) {
      return 'O Bayern de Munique tem 6 títulos (último em 2020). A final de 2025 será em seu estádio, a Allianz Arena.';
    }

    if (/(participantes|quantos times|clubes)/.test(input)) {
      return 'Na temporada 2024-25, participarão 36 clubes na fase de liga. Os 8 melhores avançam direto às oitavas.';
    }

    return 'Os maiores campeões são: 1º Real Madrid (15), 2º Milan (7), 3º Liverpool e Bayern (6). Veja a lista completa na página Clubes.';
  }

  private getWebsiteResponse(input: string): string {
    if (/(contato|suporte|ajuda|problema)/.test(input)) {
      return 'Você pode nos contatar pelo email: contato@timacodachampions.com.br ou pelo formulário na página "Contato".';
    }

    if (/(dashboard|painel|estat[íi]sticas)/.test(input)) {
      return 'No dashboard você encontra:\n- Estatísticas de jogadores\n- Comparação entre clubes\n- Gráficos de desempenho\n- Configurações do time';
    }

    if (/(login|entrar|cadastro|registro)/.test(input)) {
      return 'Para acessar seu time, faça login no canto superior direito. Se não tem conta, clique em "Registrar-se".';
    }

    return 'Nosso site oferece:\n- Dashboard com estatísticas\n- Lista completa de jogadores\n- Histórico de clubes\n- Sobre a competição';
  }

  private getStatsResponse(): string {
    return 'Algumas curiosidades:\n\n• +2.700 gols desde 1992\n• Final mais assistida: Barcelona 3-1 Man Utd (2011) - 400 mi de espectadores\n• Premiação total em 2024: €2.5 bilhões';
  }

  private getDefaultResponse(): string {
    const randomResponses = [
      'Posso te ajudar com informações sobre:\n• Jogadores\n• Clubes\n• Estatísticas\n• Sobre a competição\n\nO que deseja saber?',
      'Não entendi completamente. Pode reformular? Estou aqui para ajudar com:\n- Dados de jogadores\n- Histórico de clubes\n- Funcionalidades do site',
      'Sobre qual destes temas você quer saber?\n\n1. Página "Sobre"\n2. Jogadores\n3. Clubes\n4. Estatísticas\n5. Funcionalidades do site'
    ];
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  }
}