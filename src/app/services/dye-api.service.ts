import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DyeApiService {

  private apiUrl = `${environment.baseUrl}/dye`;
  constructor(
      private http : HttpClient,
  ) { }


  createDye(){}

  fetchDyes(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  deleteDyes(){}



}
