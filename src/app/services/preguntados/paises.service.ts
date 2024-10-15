import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private urlApi = "https://restcountries.com/v3.1/all";

  constructor(private http: HttpClient){}

  getData() : Observable<any>{
    return this.http.get<any>(this.urlApi);
  }



}
