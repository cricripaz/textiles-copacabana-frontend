import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  public apiUrl = `${environment.baseUrl}/products`;
  constructor(
    private http : HttpClient,
  ) { }

  getMaterialAndColorByName (nameProduct : string){
    return this.http.get(`${this.apiUrl}/find/${nameProduct}`)
  }
}
