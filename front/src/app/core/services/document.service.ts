import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Document } from "../../@models/entities/Document.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom, Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class DocumentService {

  constructor(
    private _httpClient : HttpClient
  ){}

  public async uploadDocument(file : File, body : Document) : Promise<Document> {
    console.log(body)
    const route = environment.urlApi + `document/upload`
    const formData : FormData = new FormData()
    formData.append('file', file)
    formData.append('label', body.label)
    formData.append('inventoryId', body.inventoryId.toString())
    return lastValueFrom(this._httpClient.post<Document>(route, formData))
  }

  public async getDocumentsByInventoryId(inventoryId: number): Promise<Document[]> {
    const route = environment.urlApi + `document/inventory/${inventoryId}`;
    return lastValueFrom(this._httpClient.get<Document[]>(route));
  }

  getDocumentContent(documentId: number): Observable<Blob> {
    return this._httpClient.get(`${environment.urlApi}document/content/${documentId}`, {
      responseType: 'blob'
    });
  }
}
