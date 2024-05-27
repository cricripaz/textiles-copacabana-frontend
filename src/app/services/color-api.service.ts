import { Injectable } from '@angular/core';
import {Color} from "../models/color.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class ColorApiService {

  private colorsUrl = `${environment.baseUrl}/colors`;


  constructor(private http :HttpClient) { }

  public getColors():Observable<any> {
    console.log(this.colorsUrl)
    return this.http.get(this.colorsUrl);
  }

  public createColor (body:any) {
    return this.http.post(`${this.colorsUrl}/create`,body)
  }

  public editColor (id:number,body:any) {
    return this.http.put(`${this.colorsUrl}/edit/${id}`,body)
  }

  public deleteColor (id:number) {
    return this.http.put(`${this.colorsUrl}/delete/${id}`, {})
  }



}
