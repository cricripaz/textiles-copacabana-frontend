import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  public apiUrl = `${environment.baseUrl}/user`;
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
        // Verifica si la respuesta tiene un mensaje de éxito
        if (response && response.message === "User Created Successfully" && response.data && response.data.length > 0) {
          const createdUser = response.data[0];  // Obtén el primer (y único) usuario del array data

          this.toastr.success('Usuario creado exitosamente');

          return createdUser;  // Retorna los datos del usuario creado
        } else {
          // Si no es 200 o si la estructura es incorrecta, lanza un error
          throw new Error('Error al crear usuario');
        }
      }),
      catchError(error => {
        this.toastr.error("Error Vuelva a intentar");

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
