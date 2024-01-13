import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DyeApiService {

  private apiUrl = 'http://localhost:3000/api/dye';
  constructor(
      private http : HttpClient,
  ) { }


  createDye(){}

  fetchDyes(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  deleteDyes(){}



}
