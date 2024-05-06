import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { InventoryMovement } from "../../@models/entities/InventoryMovement.interface"
import { lastValueFrom } from "rxjs"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementService {

  constructor(
    private _httpClient : HttpClient
  ){}


  public async listByInventoryId (inventoryId : number) : Promise<InventoryMovement[]> {
    const route = environment.urlApi + `inventory-movement/list-inventory/${inventoryId}`
    return lastValueFrom(this._httpClient.get<InventoryMovement[]>(route))
  }

  public async get (id : number) : Promise<InventoryMovement> {
    const route = environment.urlApi + `inventory-movement/${id}`
    return lastValueFrom(this._httpClient.get<InventoryMovement>(route))
  }

  public insert (data : InventoryMovement) : Promise<InventoryMovement> {
    const route = environment.urlApi + `inventory-movement`
    return lastValueFrom(this._httpClient.post<InventoryMovement>(route, data))
  }

  public update (id:number, data : InventoryMovement) : Promise<InventoryMovement> {
    const route = environment.urlApi + `inventory-movement/${id}`
    return lastValueFrom(this._httpClient.put<InventoryMovement>(route, data))
  }

  public async delete (id : number) : Promise<void> {
    const route = environment.urlApi + `inventory-movement/${id}`
    return lastValueFrom(this._httpClient.delete<void>(route))
  }

}
