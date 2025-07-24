import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { TermsModalComponent } from '../../components/terms-modal/terms-modal';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TermsModalComponent, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
    user:User = {
      email: '',
      password: '',
      acceptedTerms: false,
      username: ''
    };
  errorMessage: string = '';
  showTermsModal: boolean = false;

  constructor(private authService: AuthService, private router: Router  ) {}

  openTermsModal(): void {
    this.showTermsModal = true;
    // Abre o modal de termos
  }

  closeTermsModal(): void {
    this.showTermsModal = false;
    // Fecha o modal de termos
  }
  onAcceptTerms(): void {
    this.user.acceptedTerms = true;
    this.closeTermsModal();
    // Define acceptedTerms como true quando os termos são aceitos
  }

  register(): void {
  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!this.user.username || !usernameRegex.test(this.user.username)) {
    this.errorMessage = 'Usuário inválido (mínimo 4 caracteres, letras/números).';
    return;
  }

  if (!this.user.email || !emailRegex.test(this.user.email)) {
    this.errorMessage = 'Email inválido. ex: nome@gmail.com';
    return;
  }

  if (!this.user.password || !passwordRegex.test(this.user.password)) {
    this.errorMessage = 'Senha fraca (mínimo 6 caracteres com letras e números).';
    return;
  }

  if (!this.user.acceptedTerms) {
    this.errorMessage = 'Você deve aceitar os termos.';
    return;
  }

  const success = this.authService.register(this.user);
  if (success) {
    this.errorMessage = '';
    alert('Registro bem-sucedido!');
    this.router.navigate(['/login']);
  } else {
    this.errorMessage = 'Usuário já existe.';
  }
}


}
