import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import { FormsModule, NgForm, ReactiveFormsModule, } from '@angular/forms';
import { AppService } from '../app.service';
import { EndPointsRefs, NavigationUrls } from '../../contants';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private appService: AppService,
    private toaster: ToastrService,
    private route: Router,
    public dialogRef: MatDialogRef<AdminDashboardComponent>,
  ) {

  }
  ngOnInit(): void {

  }

  adminLogin(adminLoginForm: NgForm) {
    if (adminLoginForm.valid) {
      this.appService.getDataFromServer(EndPointsRefs.ADMIN_LOGIN + '?admin_username=' + this.username + '&admin_password=' + this.password).subscribe({
        next: (response) => {
          if (response.success) {
            this.toaster.success(response.message, 'Success!');
            this.dialogRef.close();
            this.route.navigate([NavigationUrls.ADMIN_DASHBOARD]);
          } else {
            this.toaster.error(response.message, 'Error!');
          }
        },
        error: () => {
          this.toaster.error('Something went wrong, Please try later.', 'Error!');
        }
      });
    } else {
      this.toaster.error('Form not valid, please fill correct information', 'Error!');
      return;
    }
  }
}
