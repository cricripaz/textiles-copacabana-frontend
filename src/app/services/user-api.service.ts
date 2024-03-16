import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'http://localhost:3000/api/user';
  constructor(private http : HttpClient,
              private toastr : ToastrService) { }


  fetchUsers(){
    return this.http.get(this.apiUrl)
  }

  createUser(body:any){

    return this.http.post(`${this.apiUrl}/createuser`,body).pipe(
      //TODO verificar el HTTP 200 e implementar servicio TOAST
    )

  }

  // FALTA EL EVENT
  deleteUser( userId : number ){
    //TODO enviar Toast De confrimacion para hacer delete de un USER y hacer el HTTP DELETE
    return this.http.delete(`${this.apiUrl}/delete/${userId}`)
  }

  editUser(userId:number){

  }




}
