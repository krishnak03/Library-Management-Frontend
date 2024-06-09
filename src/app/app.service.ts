import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getDataFromServer(endPoint: string, requestJson?: object): Observable<any> {
    return this.http.get(environment.BASE_URL + endPoint, requestJson).pipe(
      catchError(this.handleError)
    );
  }

  postDataToServer(endPoint: string, requestJson: object): Observable<any> {
    return this.http.post(environment.BASE_URL + endPoint, requestJson);
  }

  putDataToServer(endPoint: string, requestJson: object): Observable<any> {
    return this.http.put(environment.BASE_URL + endPoint, requestJson);
  }

  deleteDataFromServer(endPoint: string, requestJson: object): Observable<any> {
    return this.http.delete(environment.BASE_URL + endPoint, requestJson);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error for debugging purposes
    console.error('API call failed', error);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
