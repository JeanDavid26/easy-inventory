import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../../../core/services/document.service';
import { Document } from '../../../../@models/entities/Document.interface';
import { InventoryService } from '../../../../core/services/inventory.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  public inventoryId: number;
  documents: Document[] = [];
  public filteredDocuments: Document[] = [];
  public searchForm: FormGroup;
  public sortColumn: string | null = null;
  public sortDirection: 'asc' | 'desc' | null = null;

  constructor(
    private documentService: DocumentService,
    private inventoryService: InventoryService,
    private _fb: FormBuilder
  ) {
    this.inventoryId = this.inventoryService.inventory.getValue()?.id;
    this.searchForm = this._fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    this.loadDocuments();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterDocuments();
      });
  }

  async loadDocuments() {
    try {
      this.documents = await this.documentService.getDocumentsByInventoryId(this.inventoryId);
      this.filteredDocuments = [...this.documents];
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
    }
  }

  public filterDocuments(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase();
    if (!searchTerm) {
      this.filteredDocuments = [...this.documents];
    } else {
      this.filteredDocuments = this.documents.filter(document =>
        document.label?.toLowerCase().includes(searchTerm)
      );
    }
  }

  public sortDocuments(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? null : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortDirection === null) {
      this.sortColumn = null;
      this.filteredDocuments = [...this.documents];
    } else {
      this.filteredDocuments.sort((a, b) => {
        const valueA = a[column as keyof Document];
        const valueB = b[column as keyof Document];
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  async onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      await this.uploadFiles(files);
    }
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      await this.uploadFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private async uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const document: Partial<Document> = {
        label: file.name,
        inventoryId: this.inventoryId
      };
      try {
        const uploadedDocument = await this.documentService.uploadDocument(file, document as Document);
        console.log('Document uploadé avec succès:', uploadedDocument);
        await this.loadDocuments(); // Recharger la liste des documents
      } catch (error) {
        console.error('Erreur lors de l\'upload du document:', error);
      }
    }
  }

  downloadDocument(documentId: number) {
    this.documentService.getDocumentContent(documentId).subscribe((buffer) => {
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');
      document.body.appendChild(link);
      link.click();
    });
  }
}
