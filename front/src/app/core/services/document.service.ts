import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Document } from "../../@models/entities/Document.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class DocumentService {

  constructor(
    private _httpClient : HttpClient
  ){}

  public async uploadDocument(file : File, body : Document) : Promise<Document> {
    const route = environment.urlApi + `document`
    const formData : FormData = new FormData()
    formData.append('file', file)
    formData.append('label', body.label)
    formData.append('inventoryId', body.inventoryId.toString())
    return lastValueFrom(this._httpClient.post<Document>(route, formData))
  }
}
