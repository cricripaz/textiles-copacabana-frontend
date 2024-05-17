import { Injectable } from '@angular/core';
import {Color} from "../models/color.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class ColorApiService {

  private colorsUrl = 'http://localhost:3000/api/colors';
  constructor(private http :HttpClient) { }

  public getColors():Observable<any> {
    return this.http.get(this.colorsUrl);
  }
}
