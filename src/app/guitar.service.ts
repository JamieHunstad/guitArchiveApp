import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Guitar} from "./guitar";

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getGuitars(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/guitar/all`);
  }
  public addGuitar(guitar: Guitar): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/guitar/add`, guitar);
  }
  public updateGuitar(guitar: Guitar): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/guitar/update`, guitar);
  }
  public deleteGuitar(employeeId: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/guitar/delete/${employeeId}`);
  }
  public addImage(image: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/guitar/upload`, image);
  }

}


