import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../../../@models/entities/Category.interface';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public tCategory: Category[] = [];
  public filteredCategories: Category[] = [];
  public searchForm: FormGroup;
  public sortColumn: string = '';
  public sortDirection: 'asc' | 'desc' | '' = '';

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _bcService: BreadcrumbService,
    private _formBuilder: FormBuilder
  ) {
    this._bcService.setBreadCrumb([
      {
        label: 'Catégories',
        link: 'products/category'
      }
    ]);
    this.searchForm = this._formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.initList();
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.filterCategories();
    });
  }

  public async initList(): Promise<void> {
    this.tCategory = await this._categoryService.list();
    this.filterCategories();
  }

  public goToCategoryDetail(id: number): void {
    this._router.navigateByUrl(`private/products/category/${id}`);
  }

  public filterCategories(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    if (!searchTerm) {
      this.filteredCategories = this.tCategory;
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      this.filteredCategories = this.tCategory.filter(category =>
        category.label.toLowerCase().includes(searchTermLower) ||
        category.code.toLocaleLowerCase().includes(searchTermLower)
      );
    }
  }

  public sortCategories(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? '' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortDirection === '') {
      this.filterCategories();
    } else {
      this.filteredCategories.sort((a, b) => {
        let valueA, valueB;
        switch (column) {
          case 'label':
            valueA = a.label;
            valueB = b.label;
            break;
          case 'code':
            valueA = a.code;
            valueB = b.code;
            break;
          case 'tArticle':
            valueA = a.tArticle?.length || 0;
            valueB = b.tArticle?.length || 0;
            break;
          default:
            valueA = a[column as keyof Category];
            valueB = b[column as keyof Category];
        }
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }
}
