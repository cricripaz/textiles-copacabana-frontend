import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Material} from "../models/material.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialApiService {
  private apiUrl = 'http://localhost:3000/api/material';

  constructor(private http: HttpClient) { }

  public getOrders():Observable<any>{
    return this.http.get(this.apiUrl)
  }


}
