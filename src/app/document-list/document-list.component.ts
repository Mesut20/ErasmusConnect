import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(data => {
      this.documents = data;
    });
  }

  deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.documents = this.documents.filter(d => d.id !== id);
    });
  }
}
