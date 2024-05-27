import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaiementMethod } from "../../@models/entities/PaiementMethod.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaiementMethodService {

  constructor(
    private _httpClient : HttpClient
  ){}

  public async list () : Promise<PaiementMethod[]> {
    const route = environment.urlApi + `administration/paiementmethod`
    return lastValueFrom(this._httpClient.get<PaiementMethod[]>(route))
  }

  public async get (id : number) : Promise<PaiementMethod> {
    const route = environment.urlApi + `administration/paiementmethod/${id}`
    return lastValueFrom(this._httpClient.get<PaiementMethod>(route))
  }

  public insert (data : PaiementMethod) : Promise<PaiementMethod> {
    const route = environment.urlApi + `administration/paiementmethod`
    return lastValueFrom(this._httpClient.post<PaiementMethod>(route, data))
  }

  public update (id:number, data : PaiementMethod) : Promise<PaiementMethod> {
    const route = environment.urlApi + `administration/paiementmethod/${id}`
    return lastValueFrom(this._httpClient.put<PaiementMethod>(route, data))
  }

  public async delete (id : number) : Promise<void> {
    const route = environment.urlApi + `administration/paiementmethod/${id}`
    return lastValueFrom(this._httpClient.delete<void>(route))
  }
}
