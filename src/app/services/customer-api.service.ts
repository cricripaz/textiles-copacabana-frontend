import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private apiUrl = 'http://localhost:3000/api/customer';
  constructor(private http : HttpClient,
              private toastr : ToastrService) { }


  fetchCustomers(){
    return this.http.get(this.apiUrl)
  }
}
