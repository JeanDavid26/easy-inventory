import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type : 'primary' | 'normal'

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
    'bg-white',
    'border',
    'border-gray-300',
    'focus:outline-none',
    'hover:bg-gray-100',
    'focus:ring-4',
    'focus:ring-gray-100',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'dark:bg-gray-800',
    'dark:text-white',
    'dark:border-gray-600',
    'dark:hover:bg-gray-700',
    'dark:hover:border-gray-600',
    'dark:focus:ring-gray-700'
  ];

  getClasses() {
    return this.type === 'primary' ? this.primaryClasses : this.normalClasses;
  }
}
