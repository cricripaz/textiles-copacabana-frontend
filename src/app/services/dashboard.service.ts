import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.baseUrl}/dashboard`;
  constructor(private http: HttpClient) { }


  getOrdersByYear(year : number): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/orders-by-year/${year}`);

  }

  getOrdersByCity() : Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/orders-by-city`)

  }


  getOrdersByDateRange(start: string | null, end: string | null) {
    return this.http.get<any>(`${this.apiUrl}/orders-by-date-range`)
  }
}
