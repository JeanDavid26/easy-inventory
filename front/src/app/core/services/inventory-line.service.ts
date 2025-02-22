import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { InventoryLine } from "../../@models/entities/InventoryLine.interface"
import { environment } from "../../../environments/environment"
import { lastValueFrom } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class InventoryLineService {

  constructor(
    private _httpClient : HttpClient
  ){}


  public async listByInventoryId (inventoryId : number) : Promise<InventoryLine[]> {
    const route = environment.urlApi + `inventory-line/list-inventory/${inventoryId}`
    return lastValueFrom(this._httpClient.get<InventoryLine[]>(route))
  }

  public async deleteInventoryLine (id : number) : Promise<any> {
    const route = environment.urlApi + `inventory-line/${id}`
    return lastValueFrom(this._httpClient.delete<any>(route))
  }
}
