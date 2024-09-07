import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { MovementType } from '../../../../@models/entities/MovementType.interface';
import { MovementTypeService } from '../../../../core/services/movement-type.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { InventoryService } from '../../../../core/services/inventory.service';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { Article } from '../../../../@models/entities/Article.interface';
import { ArticleService } from '../../../../core/services/article.service';
import { MovementLine } from '../../../../@models/entities/MovementLine.interface';
import { MovementLineDto } from '../../../../@models/interfaces/movement-line-dto.interface';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MovementDto } from '../../../../@models/interfaces/movement-dto.interface';
import { Router } from '@angular/router';
import { Subscription, filter, first } from 'rxjs';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InventoryLine } from '../../../../@models/entities/InventoryLine.interface';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './movement-detail.component.html',
  styleUrl: './movement-detail.component.scss'
})
export class MovementDetailComponent {
  public inventory : Inventory
  faXmark = faXmark
  public steps : {id : number, isValidated : boolean, onGoing: boolean, label : string, description : string}[] = [
    { id : 1, isValidated : false, onGoing : true, label : 'Informations', description : 'Information sur le type de mouvement de stock'},
    { id : 2, isValidated : false, onGoing : false, label : 'Contenu', description : 'Contenu du mouvement (articles/quantité)'},
    { id : 3, isValidated : false, onGoing : false, label : 'Validation', description : 'Confirmation et validation'},
  ]

  public stepDisplayed : number = 1

  public formMovementInformation : FormGroup

  public toMovementType : MovementType[]
  public movmentTypeSelected : MovementType

  public toInventory : Inventory[] = []

  public toArticle : Article[] = []
  public toArticleSource : Article[] =[]
  public toArticleToSelect : Article[] = []

  public mapArticleQuantitySource : Record<number,number> = {}
  public toMovementLine : FormArray

  private _tSubsciption : Subscription[] = []
  constructor(
    private _fb : FormBuilder,
    private _inventoryMovementService : InventoryMovementService,
    private _inventoryService : InventoryService,
    private _movementTypeService : MovementTypeService,
    private _articleService : ArticleService,
    private _router : Router,
    private _toastService : ToastService,
    private _bcService : BreadcrumbService
  ){
    this.inventory = this._inventoryService.inventory.value
    this._tSubsciption.push( this._inventoryService.inventory.subscribe((inventory)=>{
      this.inventory = inventory
    }))

    this._tSubsciption.push(
      this._inventoryService.inventory.pipe(
        filter(value => value !== null),
        first()
      ).subscribe((inventory)=>{
        this._bcService.setBreadCrumb([
          {
            label : 'Stock',
            link : 'inventory'
          },
          {
            label : `${inventory.id ? inventory.label : 'Nouveau stock'}`,
            link : `inventory/${this.inventory.id}/content`
          },
          {
            label : `Mouvements de stock`,
            link : `inventory/${this.inventory.id}/movement`
          },
          {
            label : `Nouveau mouvement`,
            link : `inventory/${this.inventory.id}/movement/0`
          },
        ])
      })
    )


    this.initList().then(()=>{
      this._initForm()
    })
  }

  get movementLines(): FormArray {
    return this.formMovementInformation.get('movementLines') as FormArray;
  }

  private async  initList () : Promise<void> {
    this.toMovementType = await this._movementTypeService.list()
    this.toInventory = await this._inventoryService.list()
    this.toArticle = await this._articleService.list()
  }
  private _initForm () : void {
    const reference = this._createReference()
    this.formMovementInformation = this._fb.group({
      reference : reference,
      movementTypeId : null,
      dateTime : null,
      sourceInventoryId : null,
      destinationInventoryId : null,
      description : null,
      movementLines: this._fb.array([])
    })

    this._tSubsciption.push(
      this.formMovementInformation.get('movementTypeId').valueChanges.subscribe((id)=> {
        if(id){
          this.movmentTypeSelected = this.toMovementType.find((obj)=> obj.id === Number(id))
          if(this.movmentTypeSelected.isInternal){
            this.formMovementInformation.get('sourceInventoryId').setValue(this._inventoryService.inventory.getValue().id)
            this.formMovementInformation.get('sourceInventoryId').disable()
            this.formMovementInformation.get('destinationInventoryId').setValue(null)
            this.formMovementInformation.get('destinationInventoryId').enable()
            const tInventoryLineSource = this.inventory.tInventoryLine;
            for (const oInventoryLine of tInventoryLineSource) {
              this.mapArticleQuantitySource[oInventoryLine.articleId] = oInventoryLine.quantity;
              const oArticle = this.toArticle.find((obj) => obj.id === oInventoryLine.articleId);
              if (oArticle) {
                this.toArticleSource.push(oArticle);
              }
            }
          } else {
            this.formMovementInformation.get('sourceInventoryId').setValue(null)
            this.formMovementInformation.get('sourceInventoryId').enable()
            this.formMovementInformation.get('destinationInventoryId').disable()
            this.formMovementInformation.get('destinationInventoryId').setValue(this._inventoryService.inventory.getValue().id)
            this.toArticleSource = []
            this.mapArticleQuantitySource = {}
          }
        }
      })
    )

  }

  private _createReference() : string {
    const dateNow = new Date()
    const an = dateNow.getFullYear().toString()
    const mois = dateNow.getMonth().toString()
    const jour = dateNow.getDate().toString()
    const heureMinuteSeconde = `${dateNow.getHours()}${dateNow.getMinutes()}`
    return `M_${an}_${mois}_${jour}_${heureMinuteSeconde}`
  }

  public validateStep1() : void {
    const formValue = this.formMovementInformation.getRawValue()
    if(!formValue.reference || !formValue.dateTime || !formValue.movementTypeId) {
      this._toastService.displayToast('warning', 'Veuillez renseigner tous les champs')
      return
    }

    this.steps[0].onGoing = false
    this.steps[0].isValidated = true
    this.steps[1].onGoing = true
    this.stepDisplayed = 2
  }

  public validateStep2() : void {
    this.steps[1].onGoing = false
    this.steps[1].isValidated = true
    this.steps[2].onGoing = true
    this.stepDisplayed = 3
  }

  public retourStep1() : void {
    this.steps[0].isValidated = false
    this.steps[0].onGoing = true
    this.steps[1].onGoing = false
    this.stepDisplayed = 1
  }

  public retourStep2() : void {
    this.steps[1].isValidated = false
    this.steps[1].onGoing = true
    this.steps[2].onGoing = false
    this.stepDisplayed = 2
  }



  // Méthode pour initialiser un FormGroup représentant un MovementLineDto
  createMovementLine(): FormGroup {
    return this._fb.group({
      articleId:[null, [Validators.required]],  // Initialiser avec une valeur par défaut si nécessaire
      quantity: [null, [Validators.required, this.quantityValidator.bind(this)]]
    });
  }

  quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const articleId = control.parent?.get('articleId')?.value;
    if (articleId && this.mapArticleQuantitySource[articleId] !== undefined) {
      const maxQuantity = this.mapArticleQuantitySource[articleId];
      if (control.value > maxQuantity) {
        control.setValue(maxQuantity)
        return { 'maxQuantity': true };
      }
    }
    return null;
  }
  removeMovementLine(index : number) : void {
    this.movementLines.removeAt(index)
  }

  // Méthode pour ajouter un nouveau FormGroup à FormArray
  addMovementLine() {
    this.movementLines.push(this.createMovementLine());
  }

  async enregistrer () : Promise<void> {
    const movementDto : MovementDto = {
      ... this.formMovementInformation.getRawValue(),
      movementLines : this.movementLines.getRawValue()
    }
    movementDto.movementTypeId = Number(movementDto.movementTypeId)
    this._inventoryMovementService.insert(movementDto).then((res)=> {
      if(res){
        this._toastService.displayToast('sucess')
        this._router.navigateByUrl(`/private/inventory/${this.inventory.id}/movement`)
      }
    })
  }

  getSourceInventoryLabel() {
    const sourceId = this.formMovementInformation.get('sourceInventoryId').value;
    const inventory = this.toInventory.find(inv => inv.id === sourceId);
    return inventory ? inventory.label : 'Non spécifié';
  }

  getDestinationInventoryLabel() {
    const destinationId = this.formMovementInformation.get('destinationInventoryId').value;
    const inventory = this.toInventory.find(inv => inv.id === destinationId);
    return inventory ? inventory.label : 'Non spécifié';
  }

  getArticleLabel(articleId: number) {
    const article = this.toArticle.find(a => a.id === Number(articleId));
    return article ? `${article.referenceCode} - ${article.label}` : 'Article non trouvé';
  }
}
