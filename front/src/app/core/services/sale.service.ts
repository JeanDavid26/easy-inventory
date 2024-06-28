import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SaleSession } from "../../@models/entities/SaleSession.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class SaleService {

  constructor(
    private _httpClient : HttpClient
  ) {}

  public listerSaleSession () : Promise<SaleSession[]> {
    const route =  environment.urlApi + `sale/session`
    return lastValueFrom(this._httpClient.get<SaleSession[]>(route))
  }

  public openSession () : Promise<SaleSession> {
    const route = environment.urlApi + 'sale/session/open'
    return lastValueFrom(this._httpClient.post<SaleSession>(route, {}))
  }
}
