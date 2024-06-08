import { Routes, provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};