import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Material} from "../models/material.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaterialApiService {
  private apiUrl = `${environment.baseUrl}/material`;

  constructor(private http: HttpClient) { }

  public getOrders():Observable<any>{
    return this.http.get(this.apiUrl)
  }

  public createMaterial (body:any) {
      return this.http.post(`${this.apiUrl}/create`,body)
  }
  public editMaterial (id: number,body:any) {
    return this.http.put(`${this.apiUrl}/edit/${id}`,body)
  }
  public deleteMaterial (id:number) {
    return this.http.put(`${this.apiUrl}/delete/${id}`,{})
  }


}
