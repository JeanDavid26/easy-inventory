import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { MovementType } from '../../../../@models/entities/MovementType.interface';
import { MovementTypeService } from '../../../../core/services/movement-type.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { InventoryService } from '../../../../core/services/inventory.service';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { Article } from '../../../../@models/entities/Article.interface';
import { ArticleService } from '../../../../core/services/article.service';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './movement-detail.component.html',
  styleUrl: './movement-detail.component.scss'
})
export class MovementDetailComponent {
  public steps : {id : number, isValidated : boolean, onGoing: boolean, label : string, description : string}[] = [
    { id : 1, isValidated : false, onGoing : true, label : 'Informations', description : 'Information sur le type de mouvement de stock'},
    { id : 2, isValidated : false, onGoing : false, label : 'Contenu', description : 'Contenu du mouvement (articles/quzntité)'},
    { id : 3, isValidated : false, onGoing : false, label : 'Validation', description : 'Confirmation et validation'},
  ]

  public stepDisplayed : number = 1

  public formMovementInformation : FormGroup

  public toMovementType : MovementType[]
  public movmentTypeSelected : MovementType

  public toInventory : Inventory[] = []

  public toArticle : Article[] = []
  constructor(
    private _fb : FormBuilder,
    private _inventoryMovementService : InventoryMovementService,
    private _inventoryService : InventoryService,
    private _movementTypeService : MovementTypeService,
    private _articleService : ArticleService,
    private _toastService : ToastService
  ){
    this.initList().then(()=>{
      this._initForm()
    })
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
      description : null
    })

    this.formMovementInformation.get('movementTypeId').valueChanges.subscribe((id)=> {
      console.log('ici', id)
      if(id){
        this.movmentTypeSelected = this.toMovementType.find((obj)=> obj.id === Number(id))
        if(this.movmentTypeSelected.isInternal){
          this.formMovementInformation.get('sourceInventoryId').setValue(this._inventoryService.inventory.getValue().id)
          this.formMovementInformation.get('sourceInventoryId').disable()
          this.formMovementInformation.get('destinationInventoryId').setValue(null)
          this.formMovementInformation.get('destinationInventoryId').enable()
        } else {
          this.formMovementInformation.get('sourceInventoryId').setValue(null)
          this.formMovementInformation.get('sourceInventoryId').enable()
          this.formMovementInformation.get('destinationInventoryId').disable()
          this.formMovementInformation.get('destinationInventoryId').setValue(this._inventoryService.inventory.getValue().id)
        }
        console.log(this.movmentTypeSelected)
      }

    })
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
    console.log(formValue)
    if(!formValue.reference || !formValue.dateTime || !formValue.movementTypeId) {
      console.log('ICI')
      this._toastService.displayToast('warning', 'Veuillez renseigner tous les champs')
      return
    }
    this.steps[0].onGoing = false
    this.steps[0].isValidated = true
    this.steps[1].onGoing = true
    this.stepDisplayed = 2
  }

  public validateStep2() : void {

  }

  public retourStep1() : void {
    this.steps[0].isValidated = false
    this.steps[0].onGoing = true
    this.steps[1].onGoing = false
    this.stepDisplayed = 1
  }
}
