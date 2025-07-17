import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(Username: string, Password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Username, Password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  register(formData: FormData): Observable<any> {
    // Accept FormData for full profile registration
    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }
}
