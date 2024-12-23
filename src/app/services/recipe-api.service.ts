import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private apiUrl = `${environment.baseUrl}/recipe`;
  constructor(
    private http : HttpClient,
    private toastr : ToastrService) { }


  fetchRecipes():Observable<any>  {

    return this.http.get(this.apiUrl)
  }

  createRecipe(recipe : any) {
    return this.http.post(`${this.apiUrl}/create`, recipe).pipe(
      map((response: any) => {
        // Verifica si la respuesta tiene un código de estado 200

        if (response && response.message === "Recipe created successfully") {


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
  deleteRecipe(id:number){
    const url = `${this.apiUrl}/delete/${id}`;
    console.log("URL de eliminación:", url); // Verificar la URL
    return this.http.delete(url)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar receta:', error);
          return throwError(error); // Reenviar el error
        })
      );
  }


  editRecipe(recipe : any, id : number) {

    return this.http.put( `${this.apiUrl}/update/${id}`,recipe )

  }


}
