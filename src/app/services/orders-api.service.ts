import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {
  private apiUrl = 'http://localhost:3000/api/orders';
  constructor(
    private http : HttpClient
  ) { }



  public getOrders(){
    return this.http.get(this.apiUrl)
  }


}