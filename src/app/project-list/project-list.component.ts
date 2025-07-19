import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectService } from '../services/project.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule] // Ta bort ConfirmDialogComponent
})
export class ProjectListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  loading = true;
  error = '';

  displayedColumns: string[] = ['title', 'description', 'sendingUniversity', 'receivingUniversity', 'country', 'applicationDeadline', 'ectsCredits', 'actions'];

  constructor(private projectService: ProjectService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.getProjects().pipe(
      tap(data => {
        this.dataSource.data = data || [];
        this.loading = false;
      }),
      catchError(err => {
        this.error = 'Fel vid hämtning av projekt';
        this.loading = false;
        return throwError(() => err);
      })
    ).subscribe();
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Bekr�fta radering av projekt?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).subscribe({
          next: () => this.ngOnInit(),
          error: (err: any) => this.error = 'Radering misslyckades'
        });
      }
    });
  }
}
