import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  private apiUrl = 'http://localhost:3000/api/inventory';
  constructor(
    private http : HttpClient
  ) { }

  public fetchInventory() : Observable<any>{
    return this.http.get<any>(this.apiUrl)
  }

  public createDyeInventory(body: any){
    return this.http.post(`${this.apiUrl}/addItem`,body)
  }


}
