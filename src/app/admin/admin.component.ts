import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div *ngIf="users as usersArray">
      <p>{{ usersArray[0]?.username || 'No username' }}</p>
    </div>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private authService = inject(AuthService);
  users: any[] = [];

  ngOnInit() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users || [];
    });
  }
}
