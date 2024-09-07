import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../../core/services/article.service';
import { Router } from '@angular/router';
import { Article } from '../../../../@models/entities/Article.interface';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { CategoryService } from '../../../../core/services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  public tArticle: Article[] = [];
  public filteredArticles: Article[] = [];
  public tCategory: any[] = [];
  public searchForm: FormGroup;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _bcService: BreadcrumbService,
    private _categoryService: CategoryService,
    private _fb: FormBuilder
  ) {
    this.searchForm = this._fb.group({
      searchTerm: ['']
    });
    this._bcService.setBreadCrumb([
      {
        label: 'Article',
        link: 'products/article'
      }
    ]);
  }

  ngOnInit(): void {
    this.initList();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterArticles();
      });
  }

  public async initList(): Promise<void> {
    await this.loadCategories();
    this.tArticle = await this._articleService.list();
    this.filteredArticles = [...this.tArticle];
  }

  public goToArticleDetail(id: number): void {
    this._router.navigateByUrl(`private/products/article/${id}`);
  }

  async loadCategories(): Promise<void> {
    try {
      this.tCategory = await this._categoryService.list();
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  }

  public filterArticles(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value.toLowerCase();
    if (!searchTerm) {
      this.filteredArticles = [...this.tArticle];
    } else {
      this.filteredArticles = this.tArticle.filter(article =>
        article.referenceCode.toLowerCase().includes(searchTerm) ||
        article.barCode.toLowerCase().includes(searchTerm) ||
        article.label.toLowerCase().includes(searchTerm) ||
        article.oCategory.label.toLowerCase().includes(searchTerm) ||
        article.unitPrice.toString().includes(searchTerm)
      );
    }
  }
}
