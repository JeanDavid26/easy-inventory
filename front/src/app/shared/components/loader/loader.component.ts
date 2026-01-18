import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading$ | async" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <p class="text-gray-700 font-medium">Opération en cours ...</p>
      </div>
    </div>
  `,
  styles: []
})
export class LoaderComponent {
  loading$: Observable<boolean>;
  private loaderService = inject(LoaderService)
  constructor() {
    this.loading$ = this.loaderService.isLoading();
  }
}
