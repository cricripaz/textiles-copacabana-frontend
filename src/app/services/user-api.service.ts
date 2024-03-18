import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs";

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

  createUser(body: any) {
    return this.http.post(`${this.apiUrl}/createuser`, body).pipe(
      map((response: any) => {
        // Verifica si la respuesta tiene un código de estado 200
        console.log(response);
        if (response && response.message === "User Create Successfully") {
          // Si es 200, muestra un Toastr de éxito
          this.toastr.success('Usuario creado exitosamente');


          return response;
        } else {
          // Si no es 200, lanza un error para ser capturado por el operador catchError
          throw new Error('Error al crear usuario');
        }
      }),
      catchError(error => {
        // Maneja cualquier error ocurrido durante la solicitud HTTP
        // Aquí podrías mostrar un Toastr con el mensaje de error

        this.toastr.error(error.message);

        // Retorna un observable de "fallback" con un valor predeterminado o vacío

        return of(null);
      })
    );
  }



  deleteUser( userId : number ){
    //TODO enviar Toast De confrimacion para hacer delete de un USER y hacer el HTTP DELETE
    return this.http.delete(`${this.apiUrl}/delete/${userId}`)
  }

  editUser(userId:number){

  }




}
