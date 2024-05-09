import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  public apiUrl = 'http://localhost:3000/api/user';
  constructor(private http : HttpClient,
              private toastr : ToastrService) { }


  fetchUsers() :Observable<any>{

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyaWNyaXBheiIsInJvbGVfaWQiOjEsInVzZXJfaWQiOjIzNDN9.a236i4p6gHIp6D-gmxv13CcLH77aJddZh2H70E2pXUg'; // Tu token de autenticación

    const headers = new HttpHeaders()
      .set('x-access-token', token);

    return this.http.get(this.apiUrl, {headers}
      //TODO implementar el token no harcodeado
    )
  }

  createUser(body: any) {
    return this.http.post(`${this.apiUrl}/createuser`, body).pipe(
      map((response: any) => {
        // Verifica si la respuesta tiene un código de estado 200

        if (response && response.message === "User Create Successfully") {

          this.toastr.success('Usuario creado exitosamente');

          return response;
        } else {
          // Si no es 200, lanza un error para ser capturado por el operador catchError

          throw new Error('Error al crear usuario');
        }
      }),
      catchError(error => {

        //TODO MAENJO DE ERRORRES O DEJARLO ASI
        this.toastr.error(error.error.message);

        // Retorna un observable de "fallback" con un valor predeterminado o vacío

        return of(null);
      })
    );
  }


  deleteUser( userId : number ): Observable<any>{
    //TODO enviar Toast De confrimacion para hacer delete de un USER y hacer el HTTP DELETE

    return this.http.put(`${this.apiUrl}/delete/${userId}`, {})
  }

  editUser(userId:number, userData:any){

    return this.http.put(`${this.apiUrl}/update/${userId}`, userData)

  }




}
