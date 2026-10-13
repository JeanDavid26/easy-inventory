import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// primary   : action principale de la page (une seule par zone)
// secondary : actions secondaires (annuler, retour, imprimer, ajouter une ligne...)
// danger    : actions destructives (supprimer)
// 'normal' et 'important' sont conservés comme alias de secondary et danger
export type ButtonType = 'primary' | 'secondary' | 'danger' | 'normal' | 'important'
export type ButtonSize = 'md' | 'sm' | 'icon'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type : ButtonType = 'secondary'
  @Input() size : ButtonSize = 'md'
  @Input() icon? : IconDefinition
  // 'submit' uniquement pour les formulaires validés avec Entrée (connexion, inscription)
  @Input() htmlType : 'button' | 'submit' = 'button'
  @Input() disabled : boolean = false

  private baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'whitespace-nowrap',
    'rounded-lg',
    'font-medium',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-1',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed'
  ];

  private typeClasses: Record<'primary' | 'secondary' | 'danger', string[]> = {
    primary: [ 'text-white', 'bg-blue-600', 'border', 'border-blue-600', 'hover:bg-blue-700', 'focus:ring-blue-300' ],
    secondary: [ 'text-gray-700', 'bg-white', 'border', 'border-gray-300', 'hover:bg-gray-50', 'focus:ring-gray-200' ],
    danger: [ 'text-red-600', 'bg-white', 'border', 'border-red-300', 'hover:bg-red-50', 'focus:ring-red-200' ],
  };

  private sizeClasses: Record<ButtonSize, string[]> = {
    md: [ 'text-sm', 'px-4', 'py-2.5' ],
    sm: [ 'text-sm', 'px-3', 'py-1.5' ],
    icon: [ 'text-sm', 'w-9', 'h-9' ],
  };

  getClasses() : string[] {
    return [
      ...this.baseClasses,
      ...this.typeClasses[this.resolveType()],
      ...this.sizeClasses[this.size]
    ];
  }

  private resolveType() : 'primary' | 'secondary' | 'danger' {
    switch (this.type) {
      case 'primary':
        return 'primary';
      case 'danger':
      case 'important':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
