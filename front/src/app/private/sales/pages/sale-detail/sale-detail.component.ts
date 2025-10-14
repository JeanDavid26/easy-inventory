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
import { PaymentMethodEnum } from '../../../../@models/enum/payment-method.enum';
import { PaymentMethod } from '../../../../@models/entities/PaymentMethod.interface';
import { PaymentMethodService } from '../../../../core/services/payment-method.service';
@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.scss'
})
export class SaleDetailComponent {

  public id: number
  public saleSessionId: number
  public oSaleSession: SaleSession
  public oSale: Sale

  public toPaymentMethod: PaymentMethod[] = []
  public toArticle: Article[] = []
  public mapArticleQuantity: Record<number, number> = {}

  public formGroupSale: FormGroup

  public totalFinal: number
  public totalAmountMultiple: number
  public paymentMethodEnum = PaymentMethodEnum

  public bArticleSelection: boolean = false
  public bReglement: boolean = false
  public bMultiplePayment: boolean = false
  public bReview: boolean = false
  faXmark = faXmark

  public tSubscription: Subscription[] = []

  constructor(
    private _saleService: SaleService,
    private _router: Router,
    private _bcService: BreadcrumbService,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _articleService: ArticleService,
    private _paymentMethodService: PaymentMethodService,
    private _toast: ToastService
  ) {
    this.init().then(() => {
      this._bcService.setBreadCrumb([
        {
          label: 'Vente',
          link: 'sales'
        },
        {
          label: `Session du ${new Date(this.oSaleSession.creationDate).toLocaleDateString()}`,
          link: `sales/${this.saleSessionId}`
        },
        {
          label: `${this.id === 0 ? 'Nouvelle transaction' : 'Modifier transaction'}`,
          link: `sales/${this.saleSessionId}/sale/${this.id}`
        }
      ])
    })
  }

  // TODO: faire le côté front de la remise
  get formArraySaleLine(): FormArray {
    return this.formGroupSale?.get('tSaleLine') as FormArray
  }

  get formArrayPayment(): FormArray {
    return this.formGroupSale?.get('tPayment') as FormArray
  }

  public async init(): Promise<void> {
    this.id = Number(this._activatedRoute.snapshot.params['idSale'])
    this.saleSessionId = Number(this._activatedRoute.snapshot.params['id'])
    this.oSaleSession = await this._saleService.getSaleSession(this.saleSessionId)
    if (this.id) {
      this.toArticle = await this._articleService.list()
    } else {
      this.toArticle = await this._articleService.list(['tInventoryLine'])
      this._createMappageQuantity()
    }
    this.toPaymentMethod = await this._paymentMethodService.list()

    this.formGroupSale = this._fb.group({
      totalAmout: null,
      tSaleLine: this._fb.array([]),
      tPayment: this._fb.array([])
    })

    this.tSubscription.push(this.formArraySaleLine.valueChanges.subscribe((tSaleLine) => {
      let total = 0
      for (const saleLine of tSaleLine) {
        if (saleLine.salePrice) {
          total += Number(saleLine.salePrice)
        }
      }
      this.totalFinal = total
    }))

    this.tSubscription.push(this.formArrayPayment.valueChanges.subscribe((tPayment) => {
      let total = 0
      for (const payment of tPayment) {
        if (payment.amount) {
          total += Number(payment.amount)
        }
      }
      this.totalAmountMultiple = total
    }))

    if (this.id === 0) {
      this.bArticleSelection = true
      return
    }

    if (this.id !== 0) {
      this.oSale = await this._saleService.getSale(this.id)
      this.formGroupSale.patchValue({
        totalAmout: this.oSale.totalAmount
      })
      this.oSale.tSaleLine.forEach((saleLine) => {
        this.addSaleLine(saleLine)
      })
      this.oSale.tPayment.forEach((payment) => {
        this.addPayment(payment)
      })

      this.bReview = true
      this.bArticleSelection = false
    }
  }

  private _createMappageQuantity(): void {
    let toArticleAvailable = []
    for (const oArticle of this.toArticle) {
      const quantity = oArticle.tInventoryLine.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0)
      if (quantity > 0) {
        this.mapArticleQuantity[oArticle.id] = quantity
        toArticleAvailable.push(oArticle)
      } else if (oArticle.isNotStorable) {
        this.mapArticleQuantity[oArticle.id] = -1
        toArticleAvailable.push(oArticle)
      }
    }

    this.toArticle = toArticleAvailable
  }

  public addSaleLine(oSaleLine?: SaleLine): void {
    const fg = this._fb.group({
      articleId: [oSaleLine?.articleId ?? null, Validators.required],
      quantity: [oSaleLine?.quantity ?? null, [Validators.required, this.quantityValidator.bind(this)]],
      salePrice: [oSaleLine?.salePrice ?? null, [Validators.required]]
    })
    this.tSubscription.push(fg.valueChanges.subscribe((fgValue) => {
      let totalAmout = null
      if (fgValue.articleId && fgValue.quantity) {
        const article = this.toArticle.find((article) => article.id === Number(fgValue.articleId))
        totalAmout = article.unitPrice * fgValue.quantity
      }
      fg.get('salePrice').setValue(totalAmout, { emitEvent: false })
    }))
    this.formArraySaleLine.push(fg)
  }

  quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const articleId = control.parent?.get('articleId')?.value;
    if (articleId && this.mapArticleQuantity[articleId] !== undefined) {
      const maxQuantity = this.mapArticleQuantity[articleId];
      if (maxQuantity === -1) {
        return null
      }
      if (control.value > maxQuantity) {
        control.setValue(maxQuantity)
        return { 'maxQuantity': true };
      }
    }
    return null;
  }

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let totalAmount = 0
    for (const controlToCheck of this.formArrayPayment.controls) {
      if (controlToCheck !== control.parent) {
        totalAmount += control.value
      }
    }

    if (control.value + totalAmount > this.totalFinal) {
      return { 'maxAmount': true }
    }
    return null
  }

  public totalPayment(idPaymentMethod: number): void {
    this.addPayment({
      paymentMethodId: idPaymentMethod,
      amount: this.totalFinal
    })

    this.bReglement = false
    this.bReview = true
  }

  public multiplePayment() {
    this.bMultiplePayment = true
  }

  validatePayments() {
    if (this.totalAmountMultiple !== this.totalFinal) {
      this._toast.displayToast('warning', 'Montant inexacte, veuillez vérifier les réglements !')
      return
    }

    this.bReglement = false
    this.bReview = true
  }

  public addPayment(payment?: Payment): void {
    const fg = this._fb.group({
      paymentMethodId: [payment?.paymentMethodId ?? null, [Validators.required, this.amountValidator.bind(this)]],
      amount: [payment?.amount ?? null, [Validators.required]]
    })

    this.formArrayPayment.push(fg)
  }

  public removeSaleLine(index: number): void {
    this.formArraySaleLine.removeAt(index)
  }

  public removePayment(index: number): void {
    this.formArrayPayment.removeAt(index)
  }

  public setPayments(): void {
    if (this.formArraySaleLine.length === 0) {
      this._toast.displayToast('warning', 'Veuillez renseignez 1 ligne minimum')
      return
    }

    if (this.formArraySaleLine.invalid) {
      this._toast.displayToast('warning', 'Des champs sont mal renseignés')
      return
    }

    this.bArticleSelection = false
    this.bReglement = true
  }

  public async save(): Promise<void> {
    const oSaleDto = this.formGroupSale.getRawValue()
    oSaleDto.totalAmount = this.totalFinal
    oSaleDto.saleSessionId = this.saleSessionId
    if (this.id === 0) {
      this._saleService.addSale(oSaleDto).then(() => {
        this._router.navigateByUrl(`private/sales/${this.saleSessionId}`)
      })
    }
  }


  public async supprimer(): Promise<void> {
    this._saleService.deleteSale(this.id).then(() => {
      this._router.navigateByUrl(`private/sales/${this.saleSessionId}`)
    })
  }

  getTotalBySaleLine(saleLine: any): string {
    const saleLineValue = saleLine.getRawValue()
    if (!saleLineValue.articleId || !saleLineValue.quantity) {
      return '--'
    }
    const oArticle = this.toArticle.find((article) => article.id === saleLineValue.articleId)
    return `${saleLineValue.quantity * oArticle.unitPrice}`
  }

  getArticleLabel(articleId: number) {
    const article = this.toArticle.find(a => a.id === articleId);
    return article ? `${article.referenceCode} - ${article.label}` : 'Article non trouvé';
  }

  getPaymentMethodLabel(id: number): string {
    id = Number(id)
    const oPaymentMethod = this.toPaymentMethod.find((o) => o.id === id)
    return oPaymentMethod?.label ?? ''
  }

}
