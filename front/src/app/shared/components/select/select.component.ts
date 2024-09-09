import { Component, forwardRef, Input, OnInit, ElementRef, ViewChild, Renderer2, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor, OnInit {

  // Example list of options
  @Input() tOptions : any[] =[]
  @Input() label : string
  @Input() formControlName : string
  @Input() labelKey : string[] = [ 'label']
  @Input() valueKey : string = 'id'
  dropdownOpen = false;
  selectedValue: any = null;  // Stocke la valeur sélectionnée
  selectedLabel: string = ''; // Stocke le label de l'option sélectionnée
  filteredOptions : any[]  // Filtered options for display

  get dropdownOpenGetter () : boolean {
    return this.dropdownOpen
  }
  // ValueAccessor state
  onChange = (value: any) => {};
  onTouched = () => {};
  isDisabled = false;

  searchTerm: string = '';
  showSearch: boolean = false;

  @ViewChild('selectWrapper') selectWrapper: ElementRef;
  @ViewChild('dropdownList') dropdownList: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = this.tOptions;
    this.showSearch = this.tOptions.length > 10;
  }

  // Toggle dropdown visibility
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Empêche l'événement de se propager au document
    if (!this.isDisabled) {
      this.dropdownOpen = !this.dropdownOpen;
      if (this.dropdownOpen) {
        this.searchTerm = '';
        this.filterOptions();
        setTimeout(() => {
          this.positionDropdown();
          this.focusSearchInput();
        }, 0);
      }
    }
  }
  focusSearchInput() {
    if (this.showSearch && this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

  positionDropdown() {
    const wrapperRect = this.selectWrapper.nativeElement.getBoundingClientRect();
    const dropdownEl = this.dropdownList.nativeElement;

    this.renderer.setStyle(dropdownEl, 'left', `${wrapperRect.left}px`);
    this.renderer.setStyle(dropdownEl, 'width', `${wrapperRect.width}px`);
    this.renderer.setStyle(dropdownEl, 'top', `${wrapperRect.bottom}px`);
  }

  // Select an option and close the dropdown
  selectOption(option: any) {
    this.selectedValue = option[this.valueKey];
    this.selectedLabel = this.createLabel(option) ;
    this.dropdownOpen = false;
    this.onChange(this.selectedValue);  // Notifier le changement de valeur
    this.onTouched();  // Marquer comme touché
  }
  public createLabel(option : any) : string {
    if(!option){
      return ''
    }
    return this.labelKey.map((key)=> option[key]).join(' ')

  }
  // ControlValueAccessor interface methods:

  // Write a new value to the element
  writeValue(value: any): void {
    this.selectedValue = value;
    const selectedOption = this.tOptions.find(option => option[this.valueKey] === value);
    this.selectedLabel = this.createLabel(selectedOption)
  }

  // Set the function to be called when the control value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // Set the function to be called when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Disable the component
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Close dropdown if clicked outside (optional)
  closeDropdown() {
    this.dropdownOpen = false;
  }

  // Nouvelle méthode pour filtrer les options
  filterOptions() {
    if (!this.searchTerm) {
      this.filteredOptions = this.tOptions;
    } else {
      this.filteredOptions = this.tOptions.filter(option =>
         this.labelKey.filter((key)=> option[key].toLowerCase().includes(this.searchTerm.toLocaleLowerCase())).length > 0
      );
    }
  }

  // Méthode pour gérer la saisie de recherche
  onSearchInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterOptions();
  }

  // Méthode pour obtenir le label de l'option sélectionnée
  getSelectedLabel(): string {
    return this.selectedLabel || 'Sélectionnez une option';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
