import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-modal',
  imports: [],
  templateUrl: './terms-modal.html',
  styleUrl: './terms-modal.css',
})
export class TermsModalComponent {
  @Output() accepted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  acceptTerms(): void {
    this.accepted.emit();
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
    
  }
}
