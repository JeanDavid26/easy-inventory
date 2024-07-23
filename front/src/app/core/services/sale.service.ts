import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SaleSession } from "../../@models/entities/SaleSession.interface";
import { InsertSaleDto } from "../../@models/interfaces/insert-sale-dto.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";
import { Sale } from "../../@models/entities/Sale.interface";
import { SaleLine } from "../../@models/entities/SaleLine.interface";

@Injectable({
  providedIn : 'root'
})
export class SaleService {

  constructor(
    private _httpClient : HttpClient
  ) {}

  public listSaleSession () : Promise<SaleSession[]> {
    const route =  environment.urlApi + `sale/session`
    return lastValueFrom(this._httpClient.get<SaleSession[]>(route))
  }

  public getSaleSession (id : number) : Promise<SaleSession> {
    const route =  environment.urlApi + `sale/session/${id}`
    return lastValueFrom(this._httpClient.get<SaleSession>(route))
  }

  public openSession () : Promise<SaleSession> {
    const route = environment.urlApi + 'sale/session/open'
    return lastValueFrom(this._httpClient.post<SaleSession>(route, {}))
  }

  public addSale (data : InsertSaleDto ) : Promise<Sale> {
    const route = environment.urlApi + 'sale'
    return lastValueFrom(this._httpClient.post<Sale>(route, data))
  }

  public getSale (id : number ) : Promise<Sale> {
    const route = environment.urlApi + `sale/${id}`
    return lastValueFrom(this._httpClient.get<Sale>(route))
  }
}
