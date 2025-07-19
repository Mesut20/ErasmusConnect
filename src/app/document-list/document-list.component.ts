import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator'; // För pagination om behövs

interface Document {
  title: string;
  type: string;
  filePath: string;
  studentId: number;
  projectId: number;
  uploadedAt: Date;
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatButtonModule, MatTooltipModule, MatSortModule, MatPaginatorModule, DatePipe]
})
export class DocumentListComponent {
  loading = false;
  error = '';
  dataSource: Document[] = [];
  displayedColumns: string[] = ['title', 'type', 'filePath', 'studentId', 'projectId', 'uploadedAt', 'actions'];

  confirmDelete(id: number) {
    console.log('Delete document with ID:', id);
    // Lägg till logik för att bekräfta och ta bort dokument
  }
}
