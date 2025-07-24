import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    
    // Simulando envio (substitua por sua chamada API)
    setTimeout(() => {
      console.log('Formulário válido! Dados:', this.contactForm.value);
      this.isLoading = false;
      this.showSuccessMessage();
      this.contactForm.reset();
      this.submitted = false;
    }, 1500);
  }

  private markAllAsTouched() {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private showSuccessMessage() {
    // Você pode usar um toast/snackbar ou alerta
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  }
}

