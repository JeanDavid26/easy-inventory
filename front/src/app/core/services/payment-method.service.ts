import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentMethod } from "../../@models/entities/PaymentMethod.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(
    private _httpClient : HttpClient
  ){}

  public async list () : Promise<PaymentMethod[]> {
    const route = environment.urlApi + `administration/paiementmethod/`
    return lastValueFrom(this._httpClient.get<PaymentMethod[]>(route))
  }

  public async get (id : number) : Promise<PaymentMethod> {
    const route = environment.urlApi + `administration/paiementmethod/${id}`
    return lastValueFrom(this._httpClient.get<PaymentMethod>(route))
  }

}
