import { Component } from '@angular/core';
import { SaleService } from '../../../../core/services/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Sale } from '../../../../@models/entities/Sale.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleSession } from '../../../../@models/entities/SaleSession.interface';
import { Article } from '../../../../@models/entities/Article.interface';
import { ArticleService } from '../../../../core/services/article.service';
import { SaleLine } from '../../../../@models/entities/SaleLine.interface';
import { Payment } from '../../../../@models/entities/Payment.interface';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../../shared/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.scss'
})
export class SaleDetailComponent {

  public id : number
  public saleSessionId : number
  public oSaleSession : SaleSession
  public oSale : Sale

  public toArticle : Article[] = []
  public mapArticleQuantity : Record<number,number> = {}

  public formGroupSale : FormGroup

  public totalFinal : number
  public bReglement : boolean = false

  faXmark = faXmark

  public tSubscription : Subscription[] = []

  constructor(
    private _saleService : SaleService,
    private _router : Router,
    private _bcService : BreadcrumbService,
    private _activatedRoute : ActivatedRoute,
    private _fb : FormBuilder,
    private _articleService : ArticleService,
    private _toast : ToastService
    ){
      this.init().then(()=> {
        console.log(this.oSaleSession)
        this._bcService.setBreadCrumb([
          {
            label : 'Vente',
            link : 'sales'
          },
          {
            label : `Session du ${new Date(this.oSaleSession.creationDate).toLocaleDateString()}`,
            link : `sale/${this.saleSessionId}`
          },
          {
            label : `${this.id === 0 ? 'Nouvelle transaction' : 'Modifier transaction'}`,
            link : `sale/${this.saleSessionId}/sale/${this.id}`
          }
        ])
      })
  }

  get formArraySaleLine () : FormArray {
    return this.formGroupSale?.get('tSaleLine') as FormArray
  }

  get  formArrayPayment () : FormArray {
    return this.formGroupSale?.get('tPayment') as FormArray
  }

  public async init () : Promise<void> {
    this.id = Number(this._activatedRoute.snapshot.params['idSale'])
    this.saleSessionId = Number(this._activatedRoute.snapshot.params['id'])
    console.log(this.saleSessionId)
     this.oSaleSession = await this._saleService.getSaleSession(this.saleSessionId)

    this.toArticle = await this._articleService.list([ 'tInventoryLine'])
    this._createMappageQuantity()

    this.formGroupSale = this._fb.group({
      totalAmout : null,
      tSaleLine : this._fb.array([]),
      tPayment : this._fb.array([])
    })

    this.tSubscription.push(this.formArraySaleLine.valueChanges.subscribe((tSaleLine)=> {
      let total = 0
      for(const saleLine of tSaleLine){
        if(saleLine.salePrice){
          total += Number(saleLine.salePrice)
        }
      }
      this.totalFinal = total
    }))

    if(this.id !== 0){
      this.oSale = await this._saleService.getSale(this.id)
      this.formGroupSale.patchValue({
        totalAmout : this.oSale.totalAmount
      })
      this.oSale.tSaleLine.forEach((saleLine)=> {
        this.addSaleLine(saleLine)
      })
      this.oSale.tPayments.forEach((payment)=> {
        this.addPayment(payment)
      })
    }
  }

  private _createMappageQuantity () : void {
    for(const oArticle of this.toArticle){
      const quantity =  oArticle.tInventoryLine.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0)

      this.mapArticleQuantity[oArticle.id] = quantity
    }
  }

  public addSaleLine (oSaleLine? : SaleLine) :void {
    const fg = this._fb.group({
      articleId : [oSaleLine?.id ?? null, Validators.required],
      quantity : [oSaleLine?.quantity ?? null, [Validators.required, this.quantityValidator.bind(this)]],
      salePrice : [ oSaleLine?.salePrice ?? null, [Validators.required]]
    })
    console.log(this.formArraySaleLine)
    this.tSubscription.push(fg.valueChanges.subscribe((fgValue)=> {
      let totalAmout = null
      if(fgValue.articleId && fgValue.quantity){
        const article = this.toArticle.find((article)=> article.id === Number(fgValue.articleId))
        console.log(article)
        totalAmout = article.unitPrice * fgValue.quantity
      }
      fg.get('salePrice').setValue(totalAmout, { emitEvent : false})
    }))
    this.formArraySaleLine.push(fg)
    console.log(this.formArraySaleLine)
  }

  quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const articleId = control.parent?.get('articleId')?.value;
    if (articleId && this.mapArticleQuantity[articleId] !== undefined) {
      const maxQuantity = this.mapArticleQuantity[articleId];
      if (control.value > maxQuantity) {
        control.setValue(maxQuantity)
        return { 'maxQuantity': true };
      }
    }
    return null;
  }

  public addPayment(payment ?:Payment) : void{
    const fg = this._fb.group({
      paymentMethodId : payment?.paymentMethodId ?? null,
      amout : payment?.amount ?? null
    })

    this.formArrayPayment.push(fg)
  }

    public removeSaleLine(index : number) : void {
      this.formArraySaleLine.removeAt(index)
  }

  public removePayment(index : number) : void {
    this.formArrayPayment.removeAt(index)
  }

  public setPayments () : void {
    if(this.formArraySaleLine.length === 0){
      this._toast.displayToast('warning', 'Veuillez renseignez 1 ligne minimum')
      return
    }

    if(this.formArraySaleLine.invalid){
      this._toast.displayToast('warning', 'Des champs sont mal renseignés')
      return
    }

    this.bReglement = true
  }

  public async enregistrer () :Promise<void> {
    const oSaleDto = this.formGroupSale.getRawValue()
    if(this.id === 0){
      this._saleService.addSale(oSaleDto)
    }
  }


  public async supprimer () :Promise<void> {

  }

  getTotalBySaleLine(saleLine : any) : string {
    const saleLineValue = saleLine.getRawValue()
    if(!saleLineValue.articleId || !saleLineValue.quantity){
      return '--'
    }
    console.log(saleLineValue)
    const oArticle = this.toArticle.find((article)=> article.id === saleLineValue.articleId)
    return `${saleLineValue.quantity * oArticle.unitPrice}`
  }

  getArticleLabel(articleId: number) {
    const article = this.toArticle.find(a => a.id === Number(articleId));
    return article ? `${article.referenceCode} - ${article.label}` : 'Article non trouvé';
  }

}
