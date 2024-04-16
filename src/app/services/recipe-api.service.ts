import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private apiUrl = 'http://localhost:3000/api/recipe';
  constructor(private http : HttpClient,) { }



  fetchRecipes(){
    return this.http.get(this.apiUrl)
  }
}
