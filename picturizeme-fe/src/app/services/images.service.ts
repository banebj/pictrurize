import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private resourceUrl = `${environment.apiUrl}:${environment.apiPort}${environment.apiPath}/api/images`;
  constructor(public http: HttpClient) { }

  getImage(filename) {
    return this.http.get(`${this.resourceUrl}/file/${filename}`, { responseType: "blob" })
  }

  getOneDesc(index) {
    return this.http.get(`${this.resourceUrl}?index=${index}`, { observe: "response" })
  }

  delete(id) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  getAll(limit): Observable<HttpResponse<any>> {
    return this.http.get<any[]>(`${this.resourceUrl}`, { observe: "response", params: {limit: limit} })
  }

  save(image) {
    return this.http.post(`${this.resourceUrl}`, image,  { observe: "response" })
  }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file)
    return this.http.post(`${this.resourceUrl}/upload`, formData )
  }
}
