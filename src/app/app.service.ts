import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import CryptoJS from 'crypto-js';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private mobileView = new BehaviorSubject<boolean>(false);
  public isMobileView = this.mobileView.asObservable();
  private isBrowser: boolean;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.checkViewport();
      window.addEventListener('resize', () => this.checkViewport());
    }
  }

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

  private checkViewport() {
    if (this.isBrowser) {
      const isMobile = window.innerWidth <= 768;
      this.mobileView.next(isMobile);
    }
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
