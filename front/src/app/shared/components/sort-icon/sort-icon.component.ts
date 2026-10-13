import { Component, Input } from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

// Indicateur de tri d'une colonne de tableau : double flèche discrète quand la colonne n'est pas triée,
// flèche haut (croissant) ou bas (décroissant) quand elle l'est.
@Component({
  selector: 'app-sort-icon',
  template: `
    <fa-icon
      [icon]="direction === 'asc' ? faSortUp : direction === 'desc' ? faSortDown : faSort"
      [ngClass]="direction ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'"
      class="transition-opacity"
    ></fa-icon>
  `,
  styles: [':host { display: inline-flex; }']
})
export class SortIconComponent {
  @Input() direction: 'asc' | 'desc' | '' | null = null

  readonly faSort = faSort
  readonly faSortUp = faSortUp
  readonly faSortDown = faSortDown
}
