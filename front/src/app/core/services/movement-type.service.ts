import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MovementType } from "../../@models/entities/MovementType.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovementTypeService {

  constructor(
    private _httpClient : HttpClient
  ){}

  public async list () : Promise<MovementType[]> {
    const route = environment.urlApi + `administration/movementtype/`
    return lastValueFrom(this._httpClient.get<MovementType[]>(route))
  }

  public async get (id : number) : Promise<MovementType> {
    const route = environment.urlApi + `administration/movementtype/${id}`
    return lastValueFrom(this._httpClient.get<MovementType>(route))
  }

  public insert (data : MovementType) : Promise<MovementType> {
    const route = environment.urlApi + `administration/movementtype`
    return lastValueFrom(this._httpClient.post<MovementType>(route, data))
  }

  public update (id:number, data : MovementType) : Promise<MovementType> {
    const route = environment.urlApi + `administration/movementtype/${id}`
    return lastValueFrom(this._httpClient.put<MovementType>(route, data))
  }

  public async delete (id : number) : Promise<void> {
    const route = environment.urlApi + `administration/movementtype/${id}`
    return lastValueFrom(this._httpClient.delete<void>(route))
  }
}
