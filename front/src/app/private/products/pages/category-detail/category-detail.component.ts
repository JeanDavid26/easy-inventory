import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Category } from '../../../../@models/entities/Category.interface';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Article } from '../../../../@models/entities/Article.interface';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {
  public id :number
  public category : Category = null
  public form : FormGroup

  constructor(
    private _categoryService: CategoryService,
    private _fb : FormBuilder,
    private _activatedRouteSnapshot : ActivatedRoute,
    private _router : Router,
    private _bcService : BreadcrumbService,
    private _toast : ToastService
  ) {

    this.initForm().then(()=> {
      this._bcService.setBreadCrumb([
        {
          label : 'Catégorie',
          link : 'products/category'
        },
        {
          label : `${this.id ? this.category.label : 'Nouvelle catégorie'}`,
          link : `products/category/${this.id}`
        },
      ])
    })
  }

  public async initForm() {
    this.id = Number(this._activatedRouteSnapshot.snapshot.params['id'])
    if(this.id){
      this.category = await this._categoryService.get(this.id)
    }

    this.form = this._fb.group({
      label : [this.category?.label, Validators.required],
      code : [this.category?.code],
    })
  }

  public async enregistrer () : Promise<void> {
    const category : Category = {
      ...this.form.getRawValue()
    }
    if(!this.id){
      await this._categoryService.insert(category).then(()=> {
        this._toast.displayToast('sucess')
        this._router.navigateByUrl('private/products/category')
      })
    }else {
      await this._categoryService.update(this.id, category).then(()=> {
        this._toast.displayToast('sucess')
        this._router.navigateByUrl('private/products/category')
      })
    }

  }

  goToArticle(article: Article) : void {
    this._router.navigateByUrl(`private/products/article/${article.id}`)
  }
}
