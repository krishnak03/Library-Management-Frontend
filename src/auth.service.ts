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

  private SECRET_KEY = CryptoJS.enc.Base64.parse(environment.SECRET_KEY);
  private IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Fixed IV of 16 null bytes

  login(username: string, password: string): Observable<any> {
    const jsonReq = {
      "admin_username": this.encrypt(username),
      "admin_password": this.encrypt(password)
    };
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
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), this.SECRET_KEY, {
      iv: this.IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, this.SECRET_KEY, {
      iv: this.IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
