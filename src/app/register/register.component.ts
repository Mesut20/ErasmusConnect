import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username = '';
  password = '';
  firstName = '';
  lastName = '';
  profilePic: File | null = null;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Validate first letter uppercase
    if (!/^[A-Z]/.test(this.username) || !/^[A-Z]/.test(this.password)) {
      this.error = 'Första bokstaven i användarnamn och lösenord måste vara stor.';
      return;
    }
    // Prepare registration data
    const formData = new FormData();
    formData.append('Username', this.username);
    formData.append('Password', this.password);
    formData.append('FirstName', this.firstName);
    formData.append('LastName', this.lastName);
    if (this.profilePic) {
      formData.append('ProfilePic', this.profilePic);
    }
    this.authService.register(formData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => this.error = err.error?.message || 'Registrering misslyckades.'
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profilePic = input.files[0];
    }
  }
}
