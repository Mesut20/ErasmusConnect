import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  loginForm: FormGroup;
  errorMessage: string = ''; // Lägg till error-egenskap

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).pipe(
        catchError((err: any) => {
          this.errorMessage = 'Login failed'; // Uppdatera errorMessage vid fel
          return throwError(() => err);
        })
      ).subscribe((response: any) => {
        this.authService.setToken(response.token); // Anpassa baserat på API-svar
        this.router.navigate(['/dashboard']);
      });
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Navigera till hemsidan
  }
}
