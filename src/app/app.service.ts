import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import CryptoJS from 'crypto-js';

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

  encrypt(plainText: string): string {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), CryptoJS.enc.Base64.parse(environment.SECRET_KEY), {
      iv: CryptoJS.enc.Hex.parse(environment.IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Base64.parse(environment.SECRET_KEY), {
      iv: CryptoJS.enc.Hex.parse(environment.IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
