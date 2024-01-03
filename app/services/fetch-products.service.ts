import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts():Observable<any>
  {
    return this.http.get(this.url);
  }
  deleteProduct(id: string): Observable<any> {
    const deleteUrl = `${this.url}/${id}`; // Append the ID to the URL
    return this.http.delete(deleteUrl);
  }

}
