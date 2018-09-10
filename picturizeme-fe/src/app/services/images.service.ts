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

  getOne(id) {
    return this.http.get(`${this.resourceUrl}/users/${id}`, { observe: "response" })
  }

  getAll(): Observable<HttpResponse<any>> {
    return this.http.get<any[]>(`${this.resourceUrl}`, { observe: "response" })
  }

  save(user) {
    return this.http.post(`${this.resourceUrl}/signup`, user, { observe: "response" })
  }

  upload(file: File) {
    console.debug(file)
    const formData: FormData = new FormData();
    formData.append('file', file)
    return this.http.post(`${this.resourceUrl}/upload`, formData )
  }
}
