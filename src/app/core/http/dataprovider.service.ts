import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { APP, TUTEN_LOGIN_URL } from '../constanst';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Service in charge of parsing, procces and transform
 * the data used at all the aplication.
 */
export class DataproviderService {
  constructor(private httpClient: HttpClient) {
   }



  /**
   * Function to update the description of a given user
   * @param email user target
   * @param password description updated
   */
  doLoggin(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        App: APP,
        Accept: 'aplication/json',
        Password: password,
      }),
    }
    return this.httpClient.put(TUTEN_LOGIN_URL + encodeURIComponent(email),{}, httpOptions)
    .pipe(
      map(data => data),
      catchError((error: HttpErrorResponse) => of(error))
    )
  }

}
