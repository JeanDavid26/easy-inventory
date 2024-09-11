import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type : 'primary' | 'normal' | 'important'

  primaryClasses = [
    'text-white',
    'bg-blue-500',
    'hover:bg-blue-600',
    'font-bold',
    'py-2',
    'px-4',
    'rounded'
  ];

  normalClasses = [
    'text-gray-900',
    'border',
    'focus:outline-none',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'bg-gray-800',
    'text-white',
    'border-gray-600',
    'hover:bg-gray-700',
    'hover:border-gray-600',
    'focus:ring-gray-700'
  ];

  importantClasses = [
    'text-white',
    'bg-red-500',
    'hover:bg-red-600',
    'font-bold',
    'py-2',
    'px-4',
    'rounded'
  ];

  getClasses() {
    return this.type === 'primary' ? this.primaryClasses : this.normalClasses;
  }
}
