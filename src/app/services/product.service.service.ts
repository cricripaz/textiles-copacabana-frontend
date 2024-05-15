import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  public apiUrl = 'http://localhost:3000/api/products';
  constructor(
    private http : HttpClient,
  ) { }


  fetchProducts ():Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }


}