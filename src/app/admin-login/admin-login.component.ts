import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NavigationUrls } from '../../constants';

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
export class AdminLoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private route: Router,
    public dialogRef: MatDialogRef<AdminDashboardComponent>,
  ) { }


  adminLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.dialogRef.close();
          this.route.navigate([NavigationUrls.ADMIN_DASHBOARD]);
        }
      },
      error: () => {
        this.toaster.error('Something went wrong, Please try later.', 'Error!');
      }
    });
  }

}
