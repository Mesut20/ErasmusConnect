import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  // Hämta token
  getToken(): string | null {
    return this.token; // Ersätt med faktisk logik, t.ex. från localStorage
  }

  // Sätt token
  setToken(token: string) {
    this.token = token;
  }

  // Kontrollera inloggning
  isLoggedIn(): boolean {
    return !!this.token;
  }

  // Logga ut
  logout(): void {
    this.token = null; // Rensa token
    // Lägg till ytterligare logik, t.ex. rensa localStorage
  }

  // Logga in
  login(credentials: { username: string; password: string }): Observable<any> {
    // Simulerad API-anrop (ersätt med riktig endpoint)
    return this.http.post('/api/login', credentials);
  }

  // Registrera
  register(userData: { username: string; password: string; email?: string }): Observable<any> {
    // Simulerad API-anrop (ersätt med riktig endpoint)
    return this.http.post('/api/register', userData);
  }

  // Hämta användarprofil
  getUserProfile(): Observable<any> {
    // Simulerad API-anrop (ersätt med riktig endpoint)
    return this.http.get('/api/profile');
  }

  // Hämta alla användare (för admin)
  getAllUsers(): Observable<any[]> {
    // Simulerad API-anrop (ersätt med riktig endpoint)
    return this.http.get<any[]>('/api/users');
  }
}
