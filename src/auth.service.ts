import { Injectable } from '@angular/core';
import { AppService } from './app/app.service';
import { BLANK, EndPointsRefs } from './constants';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private appService: AppService,
    private toaster: ToastrService,
    private route: Router
  ) { }


  login(username: string, password: string): Observable<any> {
    const jsonReq = {
      "admin_username": this.appService.encrypt(username),
      "admin_password": this.appService.encrypt(password)
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
    this.route.navigate([BLANK]);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
