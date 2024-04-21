import { Component } from '@angular/core';

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
}
