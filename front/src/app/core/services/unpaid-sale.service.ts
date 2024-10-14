import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UnpaidSale } from "../../@models/entities/UnpaidSale.interface";
import { Location } from "@angular/common";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class UnpaidSaleService {
  constructor (
    private _httpClient : HttpClient
  ){}

  public list (unpaidOnly = false) : Promise<UnpaidSale[]> {
    const route = Location.joinWithSlash(environment.urlApi, `unpaid?unpaidOnly=${unpaidOnly}`)
    return lastValueFrom(this._httpClient.get<UnpaidSale[]>(route))
  }
}
