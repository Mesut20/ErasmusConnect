import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule] // Ta bort ConfirmDialogComponent
})
export class StudentListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  loading = true;
  error = '';

  displayedColumns: string[] = ['name', 'email', 'homeUniversity', 'country', 'interests', 'actions'];

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.studentService.getStudents().pipe(
      tap(data => {
        this.dataSource.data = data || [];
        this.loading = false;
      }),
      catchError(err => {
        this.error = 'Fel vid hämtning av studenter';
        this.loading = false;
        return throwError(() => err);
      })
    ).subscribe();
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Bekräfta radering av student?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => this.ngOnInit(),
          error: (err: any) => this.error = 'Radering misslyckades'
        });
      }
    });
  }
}
