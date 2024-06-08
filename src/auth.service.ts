import { Injectable } from '@angular/core';
import { AppService } from './app/app.service';
import { EndPointsRefs, NavigationUrls } from './contants';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private appService: AppService,
    private toaster: ToastrService,
    private route: Router,
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.appService.getDataFromServer(EndPointsRefs.ADMIN_LOGIN + '?admin_username=' + username + '&admin_password=' + password).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('isLoggedIn', 'true');
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
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
