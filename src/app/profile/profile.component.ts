import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user: any; // L�gg till user-egenskap

  ngOnInit() {
    this.authService.getUserProfile().pipe(
      catchError((err: any) => {
        console.error('Error fetching profile:', err);
        return throwError(() => err);
      })
    ).subscribe(profile => {
      this.user = profile; // S�tt user baserat p� API-svar
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/dashboard']); // Eller annan l�mplig rutt
  }
}
