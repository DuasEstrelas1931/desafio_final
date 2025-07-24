import { Component, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from '../../auth/auth';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, FormsModule, RouterModule, CommonModule ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in', style({ opacity: 1 }))]),
    ]),
    trigger('shake', [
      transition('* => *', [
        style({ transform: 'translateX(0)' }),
        animate('100ms', style({ transform: 'translateX(-10px)' })),
        animate('100ms', style({ transform: 'translateX(10px)' })),
        animate('100ms', style({ transform: 'translateX(-10px)' })),
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})


export class LoginComponent implements AfterViewInit {
    @ViewChild('starCanvas', { static: false }) starCanvasRef!: ElementRef<HTMLCanvasElement>;
  loginForm: any; // Declare mas não inicialize

  errorMessage: string = '';
  shakeState = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      this.shakeState++;
      return;
    }

    const { username, password } = this.loginForm.value;

    console.log('Tentando login com:', username, password);

    const success = this.authService.login(username, password);
    if (success) {
      this.errorMessage = '';
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciais inválidas.';
      this.shakeState++;
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('star-canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d')!;

      const stars: any[] = [];
      const starCount = 150;

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.2 + 0.05,
        });
      }

      function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let star of stars) {
          star.alpha += star.speed * (Math.random() > 0.5 ? 1 : -1);
          if (star.alpha < 0) star.alpha = 0;
          if (star.alpha > 1) star.alpha = 1;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
        }

        requestAnimationFrame(animateStars);
      }

      animateStars();
    }
  }
}
