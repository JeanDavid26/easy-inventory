import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Document } from "../../@models/entities/Document.interface";
import { environment } from "../../../environments/environment";
import { lastValueFrom, Observable } from "rxjs";
import { Location } from "@angular/common";

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

  public getDocumentContent (documentId: number): Promise<{ fileURL : string, contentType : string }> {
    let route = Location.joinWithSlash(environment.urlApi, `document/content/${documentId}`)

    return this._httpClient.get(route, {
      responseType: 'blob',
      observe: 'response'
    }).toPromise()
      .then(res => {
        let fileName = 'dlFile'
        const cd = res.headers.get('content-disposition')
        const contentType = res.headers.get('content-type')

        if (cd && cd !== '') {
          const match = cd.match(/filename\s*=\s*([^ \s*]+)/)
          if (match) {
            fileName = match[1]
          }
        }
        const blob = new Blob([ res.body ], { type : contentType })

        const fileURL = URL.createObjectURL(blob)
        return { fileURL, contentType }

      })
      .catch(err => {
        console.error(err)
        return null
      })
  }

}
