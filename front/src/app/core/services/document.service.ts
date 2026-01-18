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
    const route = environment.urlApi + `document/upload`
    const formData : FormData = new FormData()
    formData.append('file', file)
    formData.append('label', body.metadata.label)
    formData.append('inventoryId', body.inventoryId.toString())
    return lastValueFrom(this._httpClient.post<Document>(route, formData))
  }

  public async getDocumentsByInventoryId(inventoryId: number): Promise<Document[]> {
    const route = environment.urlApi + `document/inventory/${inventoryId}`;
    return lastValueFrom(this._httpClient.get<Document[]>(route));
  }

  public async deleteDocument (documentId : number) : Promise<Document>  {
    const route = Location.joinWithSlash(environment.urlApi, `document/${documentId}`)
    return lastValueFrom(this._httpClient.delete<Document>(route))
  }

  public getDocumentContent (documentId: number): Promise<{ fileURL : string, contentType : string }> {
    let route = Location.joinWithSlash(environment.urlApi, `document/download/${documentId}`)

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
  }

  public generateSaleReport (idSaleSession: number): Promise<{ fileURL : string, contentType : string }> {
    let route = Location.joinWithSlash(environment.urlApi, `document/sale-resume/${idSaleSession}`)

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
  }

   public generateInventoryState (inventoryId: number): Promise<{ fileURL : string, contentType : string }> {
    let route = Location.joinWithSlash(environment.urlApi, `document/inventory-state/${inventoryId}`)

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
  }

  public generateSaleSessionReport (idSaleSession: number): Promise<{ fileURL : string, contentType : string }> {
    let route = Location.joinWithSlash(environment.urlApi, `document/sale-session/${idSaleSession}`)

    return this._httpClient.get(route, {
      responseType: 'blob',
      observe: 'response'
    }).toPromise()
      .then(res => {
        let fileName = 'rapport-session.pdf'
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
        window.open(fileURL)
        return { fileURL, contentType }
      })
  }
}
