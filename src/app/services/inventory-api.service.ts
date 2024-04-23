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
    return this.http.get(this.apiUrl)
  }

  public createDyeInventory(body: any){
    return this.http.post(`${this.apiUrl}/addItem`,body)
  }


  public editItemInventory(id:number,body:any){
    return this.http.put(`${this.apiUrl}/edit/${id}`,body)
  }

  public addQuantityWeight(body:any){
    return this.http.post(`${this.apiUrl}/update-weight`,body)
  }

  public deleteItemInventory(id : number){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }



}
