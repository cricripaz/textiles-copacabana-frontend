import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private apiUrl = `${environment.baseUrl}/customer`;
  constructor(
    private http : HttpClient,
              ) { }


  fetchCustomers():Observable<any>{
    return this.http.get(this.apiUrl)
  }

  createCustomer (customerData:any){
    return this.http.post(`${this.apiUrl}/create`,customerData)
  }

  editCustomer (id:number,customerData: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, customerData)
  }

  deleteUser( customer_id : number ): Observable<any>{
    return this.http.patch(`${this.apiUrl}/delete/${customer_id}`,{})
  }


}
