import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InventoryType } from "../../@models/entities/InventoryType.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryTypeService {

  constructor(
    private _httpClient : HttpClient
  ){}


  public async list () : Promise<InventoryType[]> {
    const route = environment.urlApi + `administration/inventorytype/`
    return lastValueFrom(this._httpClient.get<InventoryType[]>(route))
  }

  public async get (id : number) : Promise<InventoryType> {
    const route = environment.urlApi + `administration/inventorytype/${id}`
    return lastValueFrom(this._httpClient.get<InventoryType>(route))
  }

  public insert (data : InventoryType) : Promise<InventoryType> {
    const route = environment.urlApi + `administration/inventorytype`
    return lastValueFrom(this._httpClient.post<InventoryType>(route, data))
  }

  public update (id:number, data : InventoryType) : Promise<InventoryType> {
    const route = environment.urlApi + `administration/inventorytype/${id}`
    return lastValueFrom(this._httpClient.put<InventoryType>(route, data))
  }

  public async delete (id : number) : Promise<void> {
    const route = environment.urlApi + `administration/inventorytype/${id}`
    return lastValueFrom(this._httpClient.delete<void>(route))
  }

}
