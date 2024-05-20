import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {
  private apiUrl = `${environment.baseUrl}/orders`;
  constructor(
    private http : HttpClient
  ) { }



  public getOrders(){
    return this.http.get(this.apiUrl)
  }

  public createOrder(body:any) {
    return this.http.post(`${this.apiUrl}/create`,body)
  }

  public deleteOrder(id : number){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }


}
