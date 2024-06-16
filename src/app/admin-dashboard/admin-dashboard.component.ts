import { CommonModule } from '@angular/common';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationUrls } from '../../constants';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  constants = {
    NavigationUrls: NavigationUrls
  }
  constructor(
    private authService: AuthService,
    private route: Router,
  ) { }

  adminLogout() {
    this.authService.logout();
  }

  onClickAdminDashboard() {
    this.route.navigate([NavigationUrls.ADMIN_DASHBOARD]);
  }

  onClickUserDashboard() {
    this.route.navigate([NavigationUrls.USER_DASHBOARD]);
  }

  onClickBooksDashboard() {
    this.route.navigate([NavigationUrls.BOOK_DASHBOARD]);
  }

}
