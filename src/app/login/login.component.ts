import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css'],
standalone: true,
imports: [CommonModule, ReactiveFormsModule] // Lokalt f�r formGroup
})
export class LoginComponent {
loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

onSubmit() {
    if (this.loginForm.valid) {
      const { Username, Password } = this.loginForm.value;
      this.authService.login(Username, Password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err: any) => console.error('Login failed', err)
      });
}
}
}
