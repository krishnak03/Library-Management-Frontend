import { Injectable } from '@angular/core';
import { AppService } from './app/app.service';
import { EndPointsRefs } from './contants';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';
import CryptoJS from 'crypto-js';
import { environment } from './environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private appService: AppService,
    private toaster: ToastrService,
  ) { }

  login(username: string, password: string): Observable<any> {
    const jsonReq = {
      "adminUsername": this.encrypt(username),
      "adminPassword": this.encrypt(password)
    }
    return this.appService.postDataToServer(EndPointsRefs.ADMIN_LOGIN, jsonReq).pipe(
      tap((response) => {
        if (response.success) {
          sessionStorage.setItem('isLoggedIn', 'true');
          this.toaster.success(response.message, 'Success!');
        } else {
          this.toaster.error(response.message, 'Error!');
        }
      }),
      catchError((error) => {
        this.toaster.error('Something went wrong, Please try later.', 'Error!');
        return throwError(() => new Error(error));
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }



  encrypt(plainText: string): string {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), CryptoJS.enc.Utf8.parse(environment.SECRET_KEY), {
      keySize: 256 / 8,
      iv: CryptoJS.enc.Utf8.parse(environment.IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(environment.SECRET_KEY), {
      keySize: 256 / 8,
      iv: CryptoJS.enc.Utf8.parse(environment.IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
